var express = require('express'),
    router = express.Router(),
    Expense = require('../models/expense'),
    moment = require('moment'),
    middleware = require('../middleware/index');

//DETAILS
//EDIT ROUTE
router.get('/:id1/edit', middleware.isLoggedIn, function(req, res) {
    Expense.findById(req.params.id1, function(err, expense) {
        if (err) {
            req.flash('error', 'Expense not found');
            return res.redirect('back');
        } else {
            res.render('expenses/edit', { expense: expense, page: 'addExpenses' });
        }
    });
});

//UPDATE ROUTE
router.put('/:id1', middleware.isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var desc = req.body.description;
    var type = req.body.type;
    var amount = req.body.amount;
    var editedExpense = { author: author, description: desc, type: type, amount: amount };
    Expense.findByIdAndUpdate(req.params.id1, editedExpense, function(err, expense) {
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
router.delete('/:id1', middleware.isLoggedIn, function(req, res) {
    Expense.findByIdAndRemove(req.params.id1, function(err, expense) {
        if (err) {
            console.log(err);
        } else {
          
			req.flash('success', 'Successfully deleted expense');
			
            res.redirect('/expenses/' + expense.type);
        }
    });
});

module.exports = router;