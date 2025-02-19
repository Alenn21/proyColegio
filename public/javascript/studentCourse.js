function start() {
    var user = JSON.parse(localStorage.getItem("user")) 
    if (!user || !user.id) {
        alert("Usuario no identificado.")
        return;
    }

    fetch(`/student/courses/${user.id}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("courses-table");
            tableBody.innerHTML = ""

            if (!data.courses || data.courses.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='2'>No hay cursos disponibles</td></tr>"
            } else {
                data.courses.forEach(course => {
                    const row = `<tr>
                                    <td>${course.name}</td>
                                    <td>${course.teacher}</td>
                                </tr>`;
                    tableBody.innerHTML += row
                });
            }
        })
        .catch(error => {
            console.error("Error en el proceso:", error)
        })
}