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

    getStudentNotEnrolledCourses: (student_id, callback) => {
        const sql = `
            SELECT c.id, c.name AS course_name, CONCAT(t.name, ' ', t.lastname) AS teacher
            FROM courses c
            JOIN teachers t ON c.teacher_id = t.id
            WHERE c.id NOT IN (
                SELECT e.course_id FROM enrollments e WHERE e.student_id = ?
            )
        `;
        connection.query(sql, [student_id], callback);
    },

    delete: (student_id, course_id, callback) => {
        const sql = "DELETE FROM enrollments WHERE student_id = ? AND course_id = ?";
        connection.query(sql, [student_id, course_id], callback);
    }
};

module.exports = Enrollment;