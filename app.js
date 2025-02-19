var express = require('express')
const cors = require('cors');
var {connection} = require("./dbconfig")
const path = require('path');
var createError = require('http-errors');

//Routes
const courseRouter = require('./routes/courseRouter')
const studentRouter = require('./routes/studentRouter')
const enrollmentRouter = require('./routes/enrollmentRouter')
const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')

//Iniciar App
var app = express()
app.use(express.json())
app.use(cors())
app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000')
})

app.set('views', path.join(__dirname, 'views'));
// Servir la carpeta "public" (CSS, imágenes, JS)
app.use('/public', express.static(path.join(__dirname, 'public')));
// Servir la carpeta "views" (HTML)
app.use(express.static(path.join(__dirname, 'views')));

//Endpoints
app.use('/',indexRouter)
app.use('/login',userRouter)
app.use('/course',courseRouter)
app.use('/student',studentRouter)
app.use('/student/enrollments', enrollmentRouter)

app.use((req, res) => {
    res.status(404).json({ error: "404 - Página no encontrada" });
});



