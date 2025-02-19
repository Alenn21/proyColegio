var express = require('express')
var router = express.Router()
var studentController = require('../controllers/studentController')
var path= require('path')
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "studentCourse.html"));
});
router.get('/all',studentController.getAllStudents)
router.get('/courses/:student_id', studentController.getStudentCourses);
router.get("/create", (req, res) => {
    res.sendFile("createStudent.html", { root: "views" });
});
router.post('/insert', studentController.createStudent)
module.exports = router