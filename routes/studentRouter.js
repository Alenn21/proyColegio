var express = require('express')
var router = express.Router()
var studentController = require('../controllers/studentController')

router.get('/',studentController.getAllStudents)
router.get('/courses',studentController.getStudentCourses)
router.post('create', studentController.createStudent)
module.exports = router