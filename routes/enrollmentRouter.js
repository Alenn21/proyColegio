var express = require('express')
var router = express.Router()
var enrollmentController = require('../controllers/enrollmentController')

router.post('/create',enrollmentController.createEnrollment)
router.delete('/delete',enrollmentController.deleteEnrollment)
module.exports = router