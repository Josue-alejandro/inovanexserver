const express = require('express');
const router = express.Router();

const db = require('../db')

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    // Consulta SQL para obtener todos los usuarios
    const sql = 'SELECT * FROM usuarios';
    
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
        return;
      }

      // Enviar la respuesta con los datos de los usuarios
      res.json(data);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener un usuario por ID
router.get('/getuser/:id', (req, res) => {
  const userId = req.params.id;

  const sql = `SELECT * FROM usuarios WHERE id = ${userId}`;

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los datos del usuario.' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const user = data[0];
    res.status(200).json(user);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const userData = req.body;
  const activeState = userData.activo === true ? 1 : 0
  const blendState = userData.combinarEstadisticas === true ? 1 : 0
  const sql = `INSERT INTO usuarios (email, password, name, active, blendstats, privileges)
  VALUES ('${userData.email}', '${userData.password}', '${userData.nombre}', ${activeState}, ${blendState}, '${userData.privilegios}');`

  console.log(sql)
  db.query(sql, (err, data) => {
    console.log(data)
    res.status(200)
  })
});

// Modificar un usuario existente
router.put('/', (req, res) => {
  const userData = req.body;
  const activeState = userData.activo === true ? 1 : 0
  const blendState = userData.combinarEstadisticas === true ? 1 : 0

  const sql = `
    UPDATE usuarios
    SET email = '${userData.email}',
        password = '${userData.password}',
        name = '${userData.nombre}',
        active = ${activeState},
        blendstats = ${blendState},
        privileges = '${userData.privilegios}'
    WHERE id = ${userData.id};
  `;

  console.log(sql);

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al modificar el usuario.' });
    }

    res.status(200).json({ message: 'Usuario modificado exitosamente.' });
  });
});

// Eliminar un usuario por ID
router.delete('/delete', (req, res) => {
  const userId = req.body.id;
  const sql = `DELETE FROM usuarios WHERE id = ${userId}`

  db.query(sql, (err, data) => {
    console.log(data)
    res.status(200)
  })
});

module.exports = router;
