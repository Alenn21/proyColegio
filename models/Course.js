const { connection } = require("../dbconfig");

const Course = {
    create: (name, teacher_id, callback) => {
        const sql = "INSERT INTO courses (name, teacher_id) VALUES (?, ?)"
        connection.query(sql, [name, teacher_id], callback)
    },

    getByTeacher: (teacher_id, callback) => {
        const sql = "SELECT * FROM courses WHERE teacher_id = ?"
        connection.query(sql, [teacher_id], callback)
    }
};

module.exports = Course;