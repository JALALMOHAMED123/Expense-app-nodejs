const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/expenses', expenseController.createExpense);
router.post('/expenses/delete/:id', expenseController.deleteExpense);
router.get('/expenses/edit/:id', expenseController.getEditExpense);
router.post('/expenses/edit', expenseController.postEditExpense);


module.exports = router;