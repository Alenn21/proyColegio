const Course = require("../models/Course");

const courseController = {
    createCourse: (req, res) => {
        const { name, teacher_id } = req.body;
        Course.create(name, teacher_id, (err, result) => {
            if (err) return res.status(500).json({ error: "Error al crear curso" });
            res.json({ success: true, message: "Curso creado exitosamente" });
        });
    },

    getTeacherCourses: (req, res) => {
        const { teacher_id } = req.query;
        if (!teacher_id) {
            return res.status(400).json({ error: "Falta el teacher_id" });
        }
        Course.getByTeacher(teacher_id, (err, results) => {
            if (err) return res.status(500).json({ error: "Error obteniendo cursos" });
            res.json({ courses: results });
        });
    }
};

module.exports = courseController;