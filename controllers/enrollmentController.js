const Enrollment = require("../models/Enrollment");

const enrollmentController = {
    getCourse: (req,res) =>{
        const {student_id} = req.query
        Enrollment.getStudentNotEnrolledCourses(student_id, (err,result) =>{
            if (err) return res.status(500).json({ error: "Error consultando asignaciones" });
            res.json({courses: result});
        })
    },
    createEnrollment: (req, res) => {
        const { student_id, course_id } = req.body;
        
        //Mirar si ya existe esa asignacion
        Enrollment.findByCourseAndStudent(course_id, student_id, (err, results) => {
            if (err) return res.status(500).json({ error: "Error verificando inscripción" })
            
            if (results.length > 0) {
                return res.status(400).json({ success: false, message: "El estudiante ya está inscrito en este curso" });
            }
            
            // Crear Inscripcion
            Enrollment.create(student_id, course_id, (err, result) => {
                if (err) return res.status(500).json({ error: "Error al crear inscripción" })
                res.json({ success: true, message: "Inscripción realizada exitosamente" })
            });
        });
    },

    deleteEnrollment: (req, res) => {
        const { student_id, course_id } = req.body;
        Enrollment.delete(student_id, course_id, (err, result) => {
            if (err) return res.status(500).json({ error: "Error al eliminar inscripción" });
            res.json({ success: true, message: "Inscripción eliminada exitosamente" });
        });
    }
};

module.exports = enrollmentController;