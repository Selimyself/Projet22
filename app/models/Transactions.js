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
      type: String,
      required: true,
      enum: ['Crédit', 'Débit'],
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
      type: String,
      required: true,
      enum: ['Carte de crédit', 'Carte de débit', 'Virement bancaire', 'Espèces'],
    },
    status: {
      type: String,
      required: true,
      enum: ['En attente', 'Réalisé', 'Annulé'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;