const User = require("../models/User");

const userController = {
    login: (req, res) => {
        const { email, password } = req.body;
        User.findByEmail(email, (err, results) => {
            if (err) return res.status(500).json({ error: "Error en el servidor" });
            if (results.length === 0 || results[0].password !== password) {
                return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
            }
            res.json({ success: true, user: results[0] });
        });
    }
};

module.exports = userController;