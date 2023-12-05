const express = require('express');
const app = express();
const db = require('./db')

// Configuración de middleware para aceptar datos JSON
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configuración de las rutas
const userRoutes = require('./routes/usersRoutes');
app.use('/users', userRoutes);

const productRoutes = require('./routes/radiosRoutes');
app.use('/radios', productRoutes);

// Puerto en el que la API escuchará
const PORT = 4000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});