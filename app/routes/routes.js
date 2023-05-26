const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');
const transactionController = require('../controllers/transactionController.js');
const userController = require('../controllers/UserController.js');

// Routes pour les comptes
router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.getAccounts);
router.get('/accounts/:id', accountController.getAccount);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);

// Routes pour les transactions
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:accountId', transactionController.getTransactionsAndBalance);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

// Routes pour les utilisateurs
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
