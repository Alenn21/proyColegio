var express = require('express')
var app = express()
app.use(express.json())

// Ruta de prueba para ver si funciona la conexión
app.get('/ping', function(req, res) {
    connection.query('SELECT 1 + 1 AS result', function(error, results) {
        if (error) {
            return res.status(500).send('Error en la consulta')
        }
        res.send('Conexión exitosa a MySQL: ' + results[0].result)
    })
})

// Iniciar el servidor
app.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000')
})

module.exports = {app}