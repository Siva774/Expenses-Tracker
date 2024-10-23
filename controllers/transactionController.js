const Transaction = require('../models/transaction');

exports.addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  // Validate input
  if (!type || !category || !amount || !date) {
      return res.status(400).json({ error: "All fields are required." });
  }

  try {
      const transaction = await Transaction.create({
          type,
          category,
          amount,
          date,
          description,
      });
      res.status(201).json(transaction);
  } catch (error) {
      res.status(500).json({ error: "Server error." });
  }
};

// Example: controllers/transactionController.js
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll(); // Adjust according to your database setup
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      await transaction.update(req.body);
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      await transaction.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};



// Get Summary
exports.getSummary = async (req, res) => {
  try {
    // Calculate total income and expenses
    const totalIncome = await Transaction.sum('amount', {
      where: {
        type: 'income',
      },
    });

    const totalExpenses = await Transaction.sum('amount', {
      where: {
        type: 'expense',
      },
    });

    const balance = totalIncome - totalExpenses;

    res.json({
      totalIncome: totalIncome || 0,
      totalExpenses: totalExpenses || 0,
      balance: balance || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating the summary.' });
  }
};
