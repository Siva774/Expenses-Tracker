const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

// Define your routes here
router.post('/', (req, res) => {
    console.log('POST /api/transactions called');
    transactionController.addTransaction(req, res);
  });
  
router.get('/', transactionController.getAllTransactions); 
router.get('/:id', transactionController.getTransactionById); 
router.put('/:id', transactionController.updateTransaction); 
router.delete('/:id', transactionController.deleteTransaction);
router.get('/summary', authMiddleware, transactionController.getSummary);

module.exports = router;
