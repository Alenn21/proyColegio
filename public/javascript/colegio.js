const menu = document.getElementById("menu-items")
const spanSession = document.getElementById("li-session")
document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login"
        return;
    }
    console.log(user.role+"Usuario Logueado: "+user.email)

    if (user.role === 2) {  
        menu.innerHTML = `
            <li class="nav-item"><a class="nav-link" data-pagename="teacherCourse" href="#">Mis Cursos</a></li>
            <li class="nav-item"><a class="nav-link" data-pagename="createCourse" href="#">Crear Curso</a></li>
            <li class="nav-item"><a class="nav-link" data-pagename="createStudent" href="#">Agregar Estudiante</a></li>
        `;
    } else if (user.role === 1) {  
        menu.innerHTML = `
            <li class="nav-item"><a class="nav-link" data-pagename="studentCourse" href="#">Mis Materias</a></li>
            <li class="nav-item"><a class="nav-link" data-pagename="enrollment" href="#">Inscribir Materias</a></li>
        `;
    }
})

spanSession.addEventListener('click',function(){
    console.log("Entre a cerrar Sesion");
    localStorage.removeItem("user")
    reload()
})
menu.addEventListener("click", function (event) {
    console.log("entre1");
    if (event.target.tagName === "A") {
        console.log("entre3");
        event.preventDefault() 
        var page = event.target.getAttribute("data-pagename")
        console.log(page);
        if (page) loadContent(page)
    }
})

function loadContent(page) {

    fetch(`http://localhost:3000/${page}.html`) 
        .then(response => {
            if (!response.ok) {
                throw new Error("Página no encontrada");
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("content-container").innerHTML = html;
        })
        .catch(error => console.error("Error cargando la página:", error));
}
function reload(){
    location.reload()
}

