const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Création du nouvel utilisateur
    const newUser = await User.create({ email, password });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // Génération du token d'authentification
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);


    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion.' });
  }
};
