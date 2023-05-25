const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // hashage
    const hashedPassword = await bcrypt.hash(password, 10);

    // nouvel utilisateur
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
};

// connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // token d'authentification
    const token = jwt.sign({ userId: user._id }, 'clesecret');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion.' });
  }
};
