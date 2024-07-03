// routes/expenseroutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/expenses', expenseController.createExpense);
router.post('/expenses/delete/:id', expenseController.deleteExpense);
router.post('/expenses/edit/:id', expenseController.editExpense);

module.exports = router;
