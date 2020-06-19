const express = require('express'),
	router = express.Router(),
	Expense = require('../models/expense'),
	moment = require('moment'),
	middleware = require('../middleware/index');

//DETAILS
//EDIT ROUTE
router.get('/:id1/edit', middleware.isLoggedIn, (req, res) => {
	Expense.findById(req.params.id1, (err, expense) => {
		if (err) {
			req.flash('error', 'Expense not found');
			return res.redirect('back');
		} else {
			res.render('expenses/edit', { expense: expense, page: 'addExpenses' });
		}
	});
});

//UPDATE ROUTE
router.put('/:id1', middleware.isLoggedIn, (req, res) => {
	const author = {
		id: req.user._id,
		username: req.user.username
	};
	const description = req.body.description;
	const type = req.body.type;
	const amount = req.body.amount;
	const editedExpense = { author, description, type, amount };
	Expense.findByIdAndUpdate(req.params.id1, editedExpense, (err, expense) => {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully Updated!');

			res.redirect('/expenses/' + req.body.type);
		}
	});
});

//DESTROY ROUTE
router.delete('/:id1', middleware.isLoggedIn, (req, res) => {
	Expense.findByIdAndRemove(req.params.id1, (err, expense) => {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Successfully deleted expense');

			res.redirect('/expenses/' + expense.type);
		}
	});
});

module.exports = router;
