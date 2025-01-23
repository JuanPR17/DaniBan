const { connection } = require('../connect/connect.js');
function altaUsuario(json) {
        console.log("nombre : "+  json.nombre );
        console.log("apellido : "+  json.apellido );
        console.log("email : "+  json.email );
        console.log("saldo : "+  json.saldo );
        const query = ('insert into clientes(nombre,apellido,email,saldo)  VALUES (?,?,?,?)');
        connection.query(query, [json.nombre, json.apellido,json.email,json.saldo], (err, results) => {
          if (err) {
              console.error('Error al insertar los datos:', err.stack);
              return;
          }
          console.log('Datos insertados con éxito:', results);
        });     
}
module.exports = { altaUsuario };
