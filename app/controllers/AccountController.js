const Account = require('../models/Account');

// Créer
exports.createAccount = async (req, res) => {
  try {
    const { userId, bankName, accountName, lastUpdate } = req.body;

    const newAccount = await Account.create({ userId, bankName, accountName, lastUpdate });

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du compte.' });
  }
};

// Mettre à jour
exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const { bankName, accountName, lastUpdate } = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(accountId, { bankName, accountName, lastUpdate }, { new: true });

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Compte non trouvé.' });
    }

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du compte.' });
  }
};

// Supprimer
exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    const deletedAccount = await Account.findByIdAndRemove(accountId);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Compte non trouvé.' });
    }

    res.status(200).json({ message: 'Compte supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du compte.' });
  }
};
