const { connection } = require("../dbconfig")

const Course = {
    create: (name, teacher_id, callback) => {
        const sql = "INSERT INTO courses (name, teacher_id) VALUES (?, ?)"
        connection.query(sql, [name, teacher_id], callback)
    },

    getByTeacher: (teacher_id, callback) => {
        const sql = `SELECT 
                    CONCAT(s.name,' ',s.lastname) AS student,  
                    c.name AS course_name
                    FROM enrollments e
                    INNER JOIN students s ON e.student_id = s.id
                    INNER JOIN courses c ON e.course_id = c.id
                    WHERE c.teacher_id = ?`;
        connection.query(sql, [teacher_id], callback)
    }
};

module.exports = Course;