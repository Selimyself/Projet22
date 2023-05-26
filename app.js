const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');

app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(config.MONGODB_URI, {
})
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données', error);
  });

// Configurer les routes
const routes = require('./app/routes/routes.js');
app.use(routes);

module.exports = app;
