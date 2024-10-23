const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/transactions', authMiddleware, transactionRoutes); // Transaction routes with auth middleware

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => console.error(err));
