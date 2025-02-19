const { connection } = require("../dbconfig")

const User = {
    create: (email, password, role_id, callback) => {
        const sql = "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)"
        connection.query(sql, [email, password, role_id], callback)
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?"
        connection.query(sql, [email], callback)
    },

    findInStudents: (id, callback) => {
        const sql = "SELECT id, name, lastname FROM students WHERE user_id = ?"
        connection.query(sql,[id],callback)
    },

    findInTeachers: (id, callback) => {
        const sql = "SELECT id, name, lastname FROM teachers WHERE user_id = ?"
        connection.query(sql,[id],callback)
    }
};

module.exports = User