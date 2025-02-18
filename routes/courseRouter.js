var express = require('express')
var router = express.Router()
var courseController = require('../controllers/courseController')

router.get('/', courseController.getTeacherCourses)
router.post('/create',courseController.createCourse)
module.exports = router
