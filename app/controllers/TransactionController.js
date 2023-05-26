const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// nouvelle ligne de compte
exports.createTransaction = async (req, res) => {
  try {
    const {
      accountId,
      label,
      type,
      amount,
      paymentDate,
      paymentMethod,
      status,
      category,
    } = req.body;

    const transaction = new Transaction({
      accountId,
      label,
      type,
      amount,
      paymentDate,
      paymentMethod,
      status,
      category,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de la ligne de compte.' });
  }
};

// lire les lignes de compte et le solde du compte
exports.getTransactionsAndBalance = async (req, res) => {
  try {
    const { accountId } = req.params;

    const transactions = await Transaction.find({ accountId });
    const balance = await calculateAccountBalance(accountId);

    res.status(200).json({ transactions, balance });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la lecture des lignes de compte.' });
  }
};

// update ligne de compte
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      accountId,
      label,
      type,
      amount,
      paymentDate,
      paymentMethod,
      status,
      category,
    } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        accountId,
        label,
        type,
        amount,
        paymentDate,
        paymentMethod,
        status,
        category,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Ligne de compte non trouvée.' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de la ligne de compte.' });
  }
};

// Supprimer ligne de compte
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndRemove(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Ligne de compte non trouvée.' });
    }

    res.status(200).json({ message: 'Ligne de compte supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la ligne de compte.' });
  }
};

// calculer le solde du compte
async function calculateAccountBalance(accountId) {
  try {
    const account = await Account.findById(accountId);
    const transactions = await Transaction.find({ accountId });

    let balance = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'Crédit') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }

    return balance;
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors du calcul du solde du compte.');
}
}
