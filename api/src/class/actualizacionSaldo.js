const { connection } = require('../connect/connect.js');
function actualizacionSaldo(saldoAnterior,saldoNuevo,email,operacion) {
    const query = ('insert into movimientos(email,saldoAnterior,saldoNuevo,operacion)  VALUES (?,?,?,?)');
    connection.query(query, [email,saldoAnterior,saldoNuevo,operacion], (err, results) => {
      if (err) {
          console.error('Error al insertar los datos:', err.stack);
          return;
      }
      console.log('Datos insertados con éxito:', results);
    }); 
    const query2 = ('update clientes set saldo=? where email =?');
    connection.query(query2, [saldoNuevo,email], (err, results) => {
        if (err) {
            console.error('Error al actualizar los datos:', err.stack);
            return;
        }
        console.log('Datos actualizados con éxito:', results);
    });
}
module.exports = { actualizacionSaldo };