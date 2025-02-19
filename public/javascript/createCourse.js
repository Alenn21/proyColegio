function start(){
    document.getElementById("btn-create").addEventListener('click',function(event){
        event.preventDefault()
        const user = JSON.parse(localStorage.getItem("user"));
        var nombreCurso = document.getElementById("course-name").value.trim()
        if (!nombreCurso) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        fetch(`/course/insert`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nombreCurso,
                    teacher_id: user.id
                })
            })
            .then(response => response.json())
            .then(data =>{
                alert(data.message)
            })
            .catch(error => {
                console.error("Error en el proceso:", error);
            });
    })
}