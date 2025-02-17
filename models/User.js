const connection = require("../dbconfig");

const User = {
    create: (email, password, role_id, callback) => {
        const sql = "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)";
        connection.query(sql, [email, password, role_id], callback);
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        connection.query(sql, [email], callback);
    }
};

module.exports = User;