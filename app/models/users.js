const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Expression régulière format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Le format de l\'email est invalide.',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Expression régulière 8 caractères et un caractère spécial
        const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[\S]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        'Le mot de passe doit contenir au moins 8 caractères et un caractère spécial.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
