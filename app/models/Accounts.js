const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  lastUpdate: {
    type: Date,
    required: true
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;