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
            <li class="nav-item"><a class="nav-link" data-pagename="teacherCourse" href="#">Mis Alumnos</a></li>
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

const loadContent = function(page) {
    const contentContainer = document.getElementById("content-container");
    var pageRoute, scriptRoute;

    switch (page) {
        case "teacherCourse":
            pageRoute = "course/";
            scriptRoute = "/public/javascript/teacherCourse.js";
            break;
        case "createCourse":
            pageRoute = "course/create";
            scriptRoute = "/public/javascript/createCourse.js";
            break;
        case "createStudent":
            pageRoute = "student/create";
            scriptRoute = "/public/javascript/createStudent.js";
            break;
        case "studentCourse":
            pageRoute = "student";
            scriptRoute = "/public/javascript/studentCourse.js";
            break;
        case "enrollment":
            pageRoute = "enrollment";
            scriptRoute = "/public/javascript/enrollment.js";
            break;
        default:
            pageRoute = "";
            break;
    }

    // Agregar animación de carga
    contentContainer.innerHTML = `
        <div class="loading-container">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando contenido...</p>
        </div>
    `;

    fetch(`/${pageRoute}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Página no encontrada");
            }
            return response.text();
        })
        .then(html => {
            setTimeout(() => {  // Retraso corto para que la animación fluya bien
                contentContainer.innerHTML = html;
                contentContainer.classList.add("show");

                // Eliminar script previo si ya existe
                let oldScript = document.querySelector(`script[src="${scriptRoute}"]`);
                if (oldScript) oldScript.remove();

                // Cargar nuevo script solo si es necesario
                if (scriptRoute) {
                    let script = document.createElement('script');
                    script.src = scriptRoute;
                    script.onload = () => {
                        if (typeof start === "function") start(); 
                    };
                    document.body.appendChild(script);
                }
            }, 500); // Pequeño retraso para mejor efecto visual
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div class="error-container">
                    <h4 class="text-danger">Error</h4>
                    <p>No se pudo cargar la página.</p>
                </div>
            `;
            console.error("Error cargando la página:", error);
        });
};

function reload(){
    location.reload()
}

