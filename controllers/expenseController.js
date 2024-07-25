const Expense = require('../models/expense');

exports.getExpenses = async(req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.render('index', {
            expenses,
            editing: false
        });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createExpense = async(req, res) => {
    try {
        const { amount, description, category } = req.body;
        await Expense.create({ amount, description, category });
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteExpense = async(req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.destroy({ where: { id: expenseId } });
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getEditExpense = async(req, res) => {
    try {
        const edit = req.query.edit;
        if (!edit) return res.redirect('/');
        const expenseId = req.params.id;

        const expense = await Expense.findByPk(expenseId);
        res.render('index', {
            editing: edit,
            expense: expense
        })
    } catch (err) {
        res.status(500).json({ error: 'getExpense not working' });
    }

}
exports.postEditExpense = async(req, res) => {
    try {
        const { expenseId, amount, description, category } = req.body;
        await Expense.update({ amount, description, category }, { where: { id: expenseId } });
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};