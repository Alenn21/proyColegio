const { connection } = require("../dbconfig");

const Student = {
    create: (name, lastname, user_id, callback) => {
        const sql = "INSERT INTO students (name, lastname, user_id) VALUES (?, ?, ?)";
        connection.query(sql, [name, lastname, user_id], callback)
    },

    getAll: callback => {
        const sql = "SELECT * FROM students";
        connection.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT s.id, s.name, s.lastname, u.email FROM students s INNER JOIN users u ON s.user_id = u.id WHERE s.id = ?";
        connection.query(sql, [id], callback);
    },

    getCourses: (student_id, callback) => {
        const sql = `
            SELECT c.id, c.name, t.name as teacher_name, t.lastname as teacher_lastname
            FROM enrollments e
            INNER JOIN courses c ON e.course_id = c.id
            INNER JOIN teachers t ON c.teacher_id = t.id
            WHERE e.student_id = ?
        `;
        connection.query(sql, [student_id], callback);
    }
}

module.exports = Student;