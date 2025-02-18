const Student = require("../models/Student");

const studentController = {
    createStudent: (req, res) => {
        const { name, lastname, user_id } = req.body;
        Student.create(name, lastname, user_id, (err, result) => {
            if (err) return res.status(500).json({ error: "Error al crear estudiante" });
            res.json({ success: true, message: "Estudiante creado exitosamente" });
        });
    },

    getAllStudents: (req, res) => {
        Student.getAll((err, results) => {
            if (err) return res.status(500).json({ error: "Error obteniendo estudiantes" });
            res.json({ students: results });
        });
    },

    getStudentCourses: (req, res) => {
        const { student_id } = req.params;
        Student.getCourses(student_id, (err, results) => {
            if (err) return res.status(500).json({ error: "Error obteniendo cursos del estudiante" });
            res.json({ courses: results });
        });
    }
};

module.exports = studentController;