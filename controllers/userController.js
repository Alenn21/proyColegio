const User = require("../models/User");

const userController = {
    login: (req, res) => {
        const { email, password } = req.body;
        User.findByEmail(email, (err, results) => {
            if (err) return res.status(500).json({ error: "Error en el servidor" });
            if (results.length === 0 || results[0].password !== password) {
                return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
            }
            const auxUser = results[0];
            if (auxUser.role_id === 1) { // Estudiante
                User.findInStudents(auxUser.id, (err, studentResults) =>{
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
                            email: auxUser.email,
                            role: 1,
                            name: studentResults[0].name,
                            lastname: studentResults[0].lastname
                        }
                    });
                })
            } else if (auxUser.role_id === 2) { // Profesor
                User.findInTeachers(auxUser.id, (err, teacherResults) =>{
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
                            email: auxUser.email,
                            role: 2,
                            name: teacherResults[0].name,
                            lastname: teacherResults[0].lastname
                        }
                    });
                })
            } else {
                res.status(403).json({ success: false, message: "Rol no reconocido" });
            }
        });
    }
};

module.exports = userController;