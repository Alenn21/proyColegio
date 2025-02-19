function start() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 2) {
        console.error("No se encontró un usuario válido");
        return;
    }
    
    var teacherId = user.id;
    if (!teacherId) {
        console.error("No se encontró un ID de profesor válido");
        return;
    }

    fetch(`/course/list?teacher_id=${teacherId}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("courses-list");
            tableBody.innerHTML = "";

            if (data.courses.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='2'>No hay cursos disponibles</td></tr>";
            } else {
                data.courses.forEach(course => {
                    const row = `<tr>
                                            <td>${course.student}</td>
                                            <td>${course.course_name}</td>
                                        </tr>`;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => console.error("Error cargando cursos:", error))
}
