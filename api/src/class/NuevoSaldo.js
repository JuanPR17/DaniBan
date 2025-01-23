const { connection } = require('../connect/connect.js');

function actualizacionSaldo(saldoAnterior, NuevoSaldo, email, operacion) {
  console.log(`Datos recibidos - Saldo Anterior: ${saldoAnterior}, Nuevo Saldo: ${NuevoSaldo}, Email: ${email}, Operación: ${operacion}`);

  const query = 'INSERT INTO movimientos(email, saldoAnterior, NuevoSaldo, operacion) VALUES (?, ?, ?, ?)';
  connection.query(query, [email, saldoAnterior, NuevoSaldo, operacion], (err, results) => {
    if (err) {
      console.error('Error al insertar los datos:', err.stack);
      return;
    }
    console.log('Datos insertados con éxito:', results);
  });

  const query2 = 'UPDATE clientes SET saldo = ? WHERE email = ?';
  connection.query(query2, [NuevoSaldo, email], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos:', err.stack);
      return;
    }
    console.log('Datos actualizados con éxito:', results);
  });
}

module.exports = { actualizacionSaldo };

