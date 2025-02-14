const dotenv = require("dotenv")
dotenv.config();
var mysql = require('mysql')
// Configurar la conexión a la base de datos
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) {
        console.error('Error conectando a la DB:', err)
        return;
    }
    console.log('Conexión establecida con la DB')
});

module.exports = {connection}