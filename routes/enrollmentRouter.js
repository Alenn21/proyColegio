var express = require('express')
var router = express.Router()
var enrollmentController = require('../controllers/enrollmentController')
var path = require('path');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "enrollment.html"));
});
router.get('/course', enrollmentController.getCourse)
router.post('/create',enrollmentController.createEnrollment)
router.delete('/delete',enrollmentController.deleteEnrollment)
module.exports = router