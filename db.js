// db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'shareddb21.dfw.stackcp.net',
  user: 'Josue',
  password: 'ZekaDRX18',
  database: 'inovanex-3139315e54'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = db;