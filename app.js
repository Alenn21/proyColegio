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
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ? AND role_id = ?";
    connection.query(query, [email, password, role], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        res.status(200).json(results);
    });
});

