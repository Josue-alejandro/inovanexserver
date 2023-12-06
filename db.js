// db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'viaduct.proxy.rlwy.net',
  user: 'root',
  password: 'aG4gg-AD345Gh5BcccFgf1HeH5Fd12Cb',
  database: 'railway'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = db;