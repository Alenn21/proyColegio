const { connection } = require("../dbconfig");

const Enrollment = {
    create: (student_id, course_id, callback) => {
        const sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
        connection.query(sql, [student_id, course_id], callback);
    },

    findByCourseAndStudent: (course_id, student_id, callback) => {
        const sql = "SELECT * FROM enrollments WHERE course_id = ? AND student_id = ?";
        connection.query(sql, [course_id, student_id], callback);
    },

    getStudentEnrollments: (student_id, callback) => {
        const sql = `
            SELECT e.id, c.name as course_name, t.name as teacher_name, t.lastname as teacher_lastname
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            JOIN teachers t ON c.teacher_id = t.id
            WHERE e.student_id = ?
        `;
        connection.query(sql, [student_id], callback);
    },

    delete: (student_id, course_id, callback) => {
        const sql = "DELETE FROM enrollments WHERE student_id = ? AND course_id = ?";
        connection.query(sql, [student_id, course_id], callback);
    }
};

module.exports = Enrollment;