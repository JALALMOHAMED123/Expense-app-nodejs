// controllers/expenseController.js
const Expense = require('../models/expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.render('index', { expenses });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    await Expense.create({ amount, description, category });
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.destroy({ where: { id: expenseId } });
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.editExpense = async (req, res) => {
  try {
    const { id, amount, description, category } = req.body;
    await Expense.update({ amount, description, category }, { where: { id } });
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
