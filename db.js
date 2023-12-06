// db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '206.62.170.105',
  user: 'admin',
  password: 'ZekaDRX18',
  database: 'inovanex'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = db;