## Overview
A RESTful API for managing personal financial records, including tracking income and expenses.

## Setup Instructions
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd Personal-Expenses-Tracker`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. API is accessible at `http://localhost:3000`

## API Endpoints
- `POST /transactions`: Add a new transaction
- `GET /transactions`: Retrieve all transactions
- `GET /transactions/:id`: Retrieve a transaction by ID
- `PUT /transactions/:id`: Update a transaction by ID
- `DELETE /transactions/:id`: Delete a transaction by ID
- `GET /summary`: Get a summary of transactions
