var spanPassword = document.getElementById('span-password')
var btnLogin = document.getElementById('btn-login')
var txtMail = document.getElementById('txt-email')
var txtPassword = document.getElementById('txt-password')
spanPassword.addEventListener('click',changeEyeSpan)
btnLogin.addEventListener('click', login)

function login(event) {
    event.preventDefault(); // Evita que el formulario se recargue
    const email = txtMail.value;
    const password = txtPassword.value;
    fetch("/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify({
                id: data.user.id, 
                email: data.user.email, 
                role: data.user.role,
                name:  data.user.name,
                lastname: data.user.lastname
            })); //Guardar en local la info del usuario
            window.location.href = "/";
            console.log("Inicio Sesión: "+data.user.email+" "+data.user.role)
        } else {
            alert("Credenciales incorrectas") 
            reload()
        }
    })
    .catch(error => console.error("Error en el login:", error))
}

function changeEyeSpan(){
    var passwordInput = document.getElementById("txt-password")
    var eyeIcon = document.getElementById("eye-icon")

    if (passwordInput.type === "password") {
        passwordInput.type = "text"
        eyeIcon.innerHTML = `
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        `; // Cambiar a ojo cerrado
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = `
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        `; // Cambiar a ojo abierto
    }
}

function reload(){
    location.reload()
}