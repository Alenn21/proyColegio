var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')
var path = require("path")

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
});
router.post('/login', userController.login)

module.exports = router