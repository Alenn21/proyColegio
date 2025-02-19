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

    if (event.target.tagName === "A") {
        event.preventDefault() 
        var page = event.target.getAttribute("data-pagename")
        if (page) loadContent(page)
    }
})

function loadContent(page) {
    var pageRoute
    var scriptRoute
    switch(page){
        case "teacherCourse":
            pageRoute="course/"
            scriptRoute="/public/javascript/teacherCourse.js"
            break;
        case "createCourse":
            pageRoute="course/create"
            scriptRoute="/public/javascript/createCourse.js"
            break;
        case "createStudent":
            pageRoute="student/create"
            scriptRoute="/public/javascript/createStudent.js"
            break;
        case "studentCourse":
            pageRoute="student"
            scriptRoute="/public/javascript/studentCourse.js"
            break;
        case "enrollment":
            pageRoute="enrollment"
            scriptRoute="/public/javascript/enrollment.js"
            break;
        default:
            pageRoute=""
            break;
    }
    fetch(`/${pageRoute}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error("Página no encontrada")
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("content-container").innerHTML = html
            if (scriptRoute) {
                let script = document.createElement('script');
                script.src = scriptRoute;
                script.onload = () => {
                    start(); 
                };
                document.body.appendChild(script);
            }
        })
        .catch(error => console.error("Error cargando la página:", error))
}
function reload(){
    location.reload()
}

