var express = require('express')
var router = express.Router()
var studentController = require('../controllers/studentController')

router.get('/',studentController.getAllStudents)
router.get('/courses',studentController.getStudentCourses)
router.get("/create", (req, res) => {
    res.sendFile("createStudent.html", { root: "views" });
});
router.post('/insert', studentController.createStudent)
module.exports = router