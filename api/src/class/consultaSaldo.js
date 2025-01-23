const { connection } = require('../connect/connect.js');

 async function consultaSaldo(email) {
        console.log("email : "+  email );
        var respuesta =0.0
          try {
          const rows = await connection.query('select saldo from clientes where email= ?', [email]);
          if (rows.length > 0) {
            console.log('Saldo del cliente:',rows[0][0].saldo);
          } else {
            console.log('No se encontró el cliente con ese email.');
          }
          
         respuesta = rows[0][0].saldo
         return respuesta
        } catch (err) {
          console.error('Error al realizar la consulta:', err);
        }
          
          
          
}

module.exports = { consultaSaldo };