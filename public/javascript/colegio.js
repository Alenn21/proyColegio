const menu = document.getElementById("menu-items")

document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html"
        return;
    }
    console.log(user.role+"Usuario Logueado: "+user.email)

    if (user.role === 2) {  
        menu.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#">Mis Cursos</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Crear Curso</a></li>
        `;
    } else if (user.role === 1) {  
        menu.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#">Mis Materias</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Inscribir Materias</a></li>
        `;
    }
})

