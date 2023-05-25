const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2], // 1: Crédit, 2: Débit
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4], // : Carte de crédit, 2: Carte de débit, 3: Virement bancaire, 4: Espèces
  },
  status: {
    type: Number,
    required: true,
    enum: [1, 2, 3], // 1: En attente, 2: Réalisé, 3: Annulé
  },
  category: {
    type: String,
    required: true,
  },
});

// category 

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;