const { connection } = require('../connect/connect.js');

 async function consultaMovimientos(email) {
        console.log("email : "+  email );
        let saldoArreglo=[] 
          try {
          const rows = await connection.query('select saldoAnterior,saldoNuevo,operacion,fecha from movimientos where email= ? order by fecha desc', [email]);
           
          if (rows.length > 0) {
            for (var arreglo of rows[0]) {
              saldoArreglo.push(arreglo)
            }
            console.log('Saldo del cliente:',saldoArreglo);
          } else {
            console.log('No se encontró el cliente con ese email.');
          }
         return {movimientos:saldoArreglo}
        } catch (err) {
          console.error('Error al realizar la consulta:', err);
        }      
}

module.exports = { consultaMovimientos };