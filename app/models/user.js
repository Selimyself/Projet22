const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // format de l'email
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
        // 8 caractères et un caractère spécial
        const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[\S]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        'Le mot de passe doit contenir au moins 8 caractères et un caractère spécial.',
    },
  },
});

// Middleware pre pour le hashage du mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.path('email').validate(function (value) {
    return mongoose.models.User.findOne({ email: value }).then((user) => {
      if (user) {
        return false; // False si user existe
      }
      return true;
    });
  }, 'Cet email est déjà utilisé.');

const User = mongoose.model('User', userSchema);

module.exports = User;
