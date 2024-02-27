const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Simulación de una base de datos (en memoria)
let users = [];

// Ruta para obtener todos los usuarios (GET)
app.get('/users', (req, res) => {
  res.json(users);
});

// Ruta para obtener un usuario por su username (GET)
app.get('/users/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para registrar un nuevo usuario (POST)
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Ruta para actualizar los datos de un usuario (PUT)
app.put('/users/:username', (req, res) => {
  const { username } = req.params;
  const updatedUser = req.body;
  users = users.map(user => (user.username === username ? updatedUser : user));
  res.json(updatedUser);
});

// Ruta para eliminar un usuario (DELETE)
app.delete('/users/:username', (req, res) => {
  const { username } = req.params;
  users = users.filter(user => user.username !== username);
  res.status(204).end();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});