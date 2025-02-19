function start() {
    document.getElementById("btn-create").addEventListener('click', function(event) {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            window.location.href = "/login"
            return;
        }
        var studentName = document.getElementById("student-name").value.trim();
        var studentLastName = document.getElementById("student-lastname").value.trim();
        var email = document.getElementById("student-email").value.trim();
        var password = document.getElementById("student-password").value.trim();
        
        if (!studentName || !studentLastName || !email || !password) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        fetch(`/login/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                role_id: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert("Error: " + (data.message || "El usuario ya existe."));
                return Promise.reject("El usuario ya existe");
            }
            //Buscar por correo al usuario para obtener el id
            return fetch(`/login/find?email=${encodeURIComponent(email)}`);
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success || !data.user_id) {
                alert("Error: No se encontró el usuario después de crearlo.");
                return Promise.reject("Usuario no encontrado");
            }

            // Insertar el estudiante
            return fetch(`/student/insert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: studentName,
                    lastname: studentLastName,
                    user_id: data.user_id
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert("Error al crear el estudiante: " + data.message);
            } else {
                alert("Estudiante creado exitosamente");
            }
        })
        .catch(error => {
            console.error("Error en el proceso:", error);
        });
    });
}