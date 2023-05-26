const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: true,
  },
  label: {
    type: String,
    required: [true, 'Le libellé est requis.'],
    minlength: [2, 'Le libellé doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le libellé ne peut pas dépasser 50 caractères.'],
  },
  type: {
    type: String,
    required: [true, 'Le type est requis.'],
    enum: {
      values: ['Crédit', 'Débit'],
      message: 'Le type doit être soit "Crédit" ou "Débit".',
    },
  },
  amount: {
    type: Number,
    required: [true, 'Le montant est requis.'],
  },
  paymentDate: {
    type: Date,
    required: [true, 'La date de paiement est requise.'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'La méthode de paiement est requise.'],
    enum: {
      values: ['Carte de crédit', 'Carte de débit', 'Virement bancaire', 'Espèces'],
      message: 'La méthode de paiement doit être valide.',
    },
  },
  status: {
    type: String,
    required: [true, 'Le statut est requis.'],
    enum: {
      values: ['En attente', 'Réalisé', 'Annulé'],
      message: 'Le statut doit être soit "En attente", "Réalisé" ou "Annulé".',
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'La catégorie est requise.'],
  },
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
