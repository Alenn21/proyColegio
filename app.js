var express = require('express')
var app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors());
var {connection} = require("./dbconfig")
app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000')
})

app.post("/login", (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" })
    }
    const query = "SELECT id, email, role_id FROM users WHERE email = ? AND password = ?"
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: "Credenciales incorrectas" });
        }

        const user = results[0];

        // Verificar si es estudiante o profesor
        if (user.role_id === 1) { // Estudiante
            connection.query("SELECT name, lastname FROM students WHERE user_id = ?", [user.id], (err, studentResults) => {
                if (err) {
                    console.error("Error obteniendo datos del estudiante:", err);
                    return res.status(500).json({ error: "Error en el servidor" });
                }

                if (studentResults.length === 0) {
                    return res.json({ success: false, message: "No se encontró información del estudiante" });
                }

                res.json({
                    success: true,
                    message: "Login exitoso",
                    user: {
                        email: user.email,
                        role: 1,
                        name: studentResults[0].name,
                        lastname: studentResults[0].lastname
                    }
                });
            });

        } else if (user.role_id === 2) { // Profesor
            connection.query("SELECT name, lastname FROM teachers WHERE user_id = ?", [user.id], (err, teacherResults) => {
                if (err) {
                    console.error("Error obteniendo datos del profesor:", err);
                    return res.status(500).json({ error: "Error en el servidor" });
                }

                if (teacherResults.length === 0) {
                    return res.json({ success: false, message: "No se encontró información del profesor" });
                }

                res.json({
                    success: true,
                    message: "Login exitoso",
                    user: {
                        email: user.email,
                        role: 2,
                        name: teacherResults[0].name,
                        lastname: teacherResults[0].lastname
                    }
                });
            });

        } else {
            res.status(403).json({ success: false, message: "Rol no reconocido" });
        }
    });
});

