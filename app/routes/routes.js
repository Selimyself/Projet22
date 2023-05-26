const express = require('express');
const router = express.Router();
const UserController = require('./controllers/userController');
const AccountController = require('./controllers/accountController');
const TransactionController = require('./controllers/transactionController');

// Routes pour l'authentification
router.post('/register', UserController.register);
router.post('/login', UserController.login);


// Routes pour les comptes
router.get('/accounts', AccountController.getAllAccounts);
router.get('/accounts/:id', AccountController.getAccountById);
router.post('/accounts', AccountController.createAccount);
router.put('/accounts/:id', AccountController.updateAccount);
router.delete('/accounts/:id', AccountController.deleteAccount);

// Routes pour les opérations
router.get('/transactions', TransactionController.getAllTransactions);
router.get('/transactions/:id', TransactionController.getTransactionById);
router.post('/transactions', TransactionController.createTransaction);
router.put('/transactions/:id', TransactionController.updateTransaction);
router.delete('/transactions/:id', TransactionController.deleteTransaction);

// Route pour obtenir les opérations non pointées
router.get('/transactions/unpointed', TransactionController.getUnpointedTransactions);

// Route pour obtenir le solde total des comptes de l'utilisateur
router.get('/accounts/balance', AccountController.getTotalBalance);

// Route pour obtenir les dépenses du mois par catégorie
router.get('/transactions/expenses/:category/:month/:year', TransactionController.getMonthlyExpensesByCategory);

module.exports = router;
