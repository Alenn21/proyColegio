const dotenv = require("dotenv")
dotenv.config();
var mysql = require('mysql')
// Configurar la conexión a la base de datos
var connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

connection.connect(function(err) {
    if (err) {
        console.error('Error conectando a la DB:', err)
        return;
    }
    console.log('Conexión establecida con la DB')
});

module.exports = {connection}