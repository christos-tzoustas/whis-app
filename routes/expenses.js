var express    = require("express"),
	router     = express.Router(),
	Expense    = require("../models/expense"),
	moment     = require("moment"),
	middleware = require("../middleware/index");

//EXPENSES
//INDEX ROUTE
router.get('/', middleware.isLoggedIn, function(req, res) {
    Expense.aggregate([
        // First Stage
        {
            $match: {
				$and:[{createdAt: { $gte: new Date(moment(1, 'DD')), $lt: new Date(moment(1, 'DD').add(1, 'month')) }},
					{"author.id": req.user._id} ]
				
            }
        },
        // Second Stage
        {
            $group: {
                _id: "$type",
				expenses: { $push: "$$ROOT" },
                totalExpensesAmount: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        },
        // Third Stage
        {
            $sort: { totalExpensesAmount: -1 }
        }
    ], function(err, expenses){
		if (err){
			console.log(err);
		} else {
			if (expenses.length < 1) {
				req.flash("success", "No data to show. Add expenses to begin :) ");
				res.redirect("/expenses/new");
			} else {
				res.render("expenses/index", {expenses: expenses, page:"expenses"});
			}
			
		}
	});
});


//NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('expenses/new', {page: "addExpenses"});
});


//SHOW ROUTE
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    Expense.find(
      
        {
				$and:[{createdAt: { $gte: new Date(moment(1, 'DD')), $lt: new Date(moment(1, 'DD').add(1, 'month')) }},
					{"author.id": req.user._id}, {"type": req.params.id}]
				
            }

    , function(err, expenses){
		if (err){
			console.log(err);
		} else {
			if (expenses.length < 1) {
				req.flash("success", "No data to show :) ");
				res.redirect("/expenses/");
			} else {
				
				res.render("expenses/show", {expenses: expenses, page:"expenses-details"});
			}
			
		}
	});
});

//CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var desc = req.body.description;
    var type = req.body.type;
    var amount = req.body.amount;
    var newExpense = { author: author, description: desc, type: type, amount: amount };

    Expense.create(newExpense, function(err, expense) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/expenses');
        }
    });
});

module.exports = router;