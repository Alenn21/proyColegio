function start() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
        alert("Usuario no identificado.");
        return;
    }

    fetch(`/enrollment/course?student_id=${user.id}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("courses-table");
            tableBody.innerHTML = "";

            if (!data.courses || data.courses.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='3'>No hay cursos disponibles</td></tr>";
            } else {
                data.courses.forEach(course => {
                    const row = `<tr>
                                    <td>${course.course_name}</td>
                                    <td>${course.teacher}</td>
                                    <td>
                                        <button onclick="enrollStudent(${course.id})">Inscribirse</button>
                                    </td>
                                </tr>`;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => {
            console.error("Error en el proceso:", error);
        });
}

// Función para inscribir al estudiante en un curso
function enrollStudent(courseId) {
    var user = JSON.parse(localStorage.getItem("user"));

    fetch(`/enrollment/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            student_id: user.id,
            course_id: courseId
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mensaje de éxito o error
        start(); // Recargar la tabla para actualizar los cursos disponibles
    })
    .catch(error => {
        console.error("Error al inscribirse:", error);
    });
}

document.addEventListener("DOMContentLoaded", start);
