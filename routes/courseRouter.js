var express = require('express')
var router = express.Router()
var courseController = require('../controllers/courseController')
var path = require('path');

router.get("/", (req, res) => {
    res.sendFile("teacherCourse.html", { root: "views" });
});
router.get('/list', courseController.getTeacherCourses)
router.get("/create", (req, res) => {
    res.sendFile("createCourse.html", { root: "views" });
});
router.post('/insert',courseController.createCourse)
module.exports = router
