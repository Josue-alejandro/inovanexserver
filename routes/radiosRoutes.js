const express = require('express');
const router = express.Router();

const db = require('../db')
// Obtener todos los radios
router.get('/', async (req, res) => {
  try {
    // Consulta SQL para obtener todos los usuarios
    const sql = 'SELECT * FROM radios';
    
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener raio:', err);
        res.status(500).json({ error: 'Error al obtener radios' });
        return;
      }

      // Enviar la respuesta con los datos de los usuarios
      res.json(data);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener radios' });
  }
});

router.get('/getradio/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'Se requiere proporcionar una ID de la radio.' });
  }

  const sql = `SELECT * FROM radios WHERE id = ${userId}`;

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener la radio.' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'radio no encontrada.' });
    }

    const radio = data[0];
    res.status(200).json(radio);
  });
});

// Crear un nuevo radio
router.post('/', (req, res) => {
  const userData = req.body;
  const sql = `INSERT INTO radios (name, json, active, users)
  VALUES ('${userData.nombre}', '${userData.url}', '${userData.activo}', '[${userData.acceso}]');`

  console.log(sql)
  db.query(sql, (err, data) => {
    console.log(data)
    res.status(200)
  })
});

// Actualizar una radio por ID
router.put('/', (req, res) => {
  const radioData = req.body

  const ActiveResult = radioData.activo === true ? 1 : 0

  const sql = `
    UPDATE radios
    SET name = '${radioData.nombre}',
        json = '${radioData.url}',
        active = '${ActiveResult}',
        users = '[${radioData.acceso}]'
    WHERE id = ${radioData.id};
  `;

  console.log(sql);

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al modificar la radio.' });
    }

    res.status(200).json({ message: 'Radio modificada exitosamente.' });
  });
});

// Eliminar una radio por ID
router.delete('/delete', (req, res) => {
  const userId = req.body.id;
  const sql = `DELETE FROM radios WHERE id = ${userId}`

  db.query(sql, (err, data) => {
    console.log(data)
    res.status(200)
  })
});

module.exports = router;