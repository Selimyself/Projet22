const app = require('./app');
const config = require('./config');

// Port d'écoute du serveur
const port = config.PORT || 3000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
