// Importa el paquete mysql2
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',      // Dirección del servidor de la base de datos
    user: 'root',           // Tu usuario de MySQL
    //password: '1234',           // Tu contraseña de MySQL
    database: 'Nueva_BD' // Nombre de la base de datos
  }).promise();



module.exports = { connection };