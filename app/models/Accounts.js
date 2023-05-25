const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bankName: {
    type: String,
    required: [true, 'Le nom de la banque est requis.'],
  },
  accountName: {
    type: String,
    required: [true, 'Le nom du compte est requis.'],
    maxlength: [50, 'Le nom du compte ne doit pas dépasser 50 caractères.'],
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;