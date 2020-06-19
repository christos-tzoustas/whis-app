const express    = require("express"),
	router     = express.Router(),
	Expense    = require("../models/expense"),
	moment     = require("moment"),
	middleware = require("../middleware/index");

//EXPENSES
//INDEX ROUTE
router.get('/', middleware.isLoggedIn, (req, res) => {
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
    ], (err, expenses) => {
		if (err){
			console.log(err);
		} else {
			if (expenses.length < 1) {
				req.flash("success", "No expenses for this month. Add expenses to begin :) ");
				res.redirect("/expenses/new");
			} else {
				
				res.render("expenses/index", {expenses: expenses, page:"expenses"});
			}
			
		}
	});
});


//NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('expenses/new', {page: "addExpenses"});
});


//SHOW ROUTE
router.get('/:id', middleware.isLoggedIn, (req, res) => {
    Expense.find(
      
        {
				$and:[{createdAt: { $gte: new Date(moment(1, 'DD')), $lt: new Date(moment(1, 'DD').add(1, 'month')) }},
					{"author.id": req.user._id}, {"type": req.params.id}]
				
            }

    , (err, expenses) => {
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
router.post('/', middleware.isLoggedIn, (req, res) => {
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const description = req.body.description;
    const type = req.body.type;
    const amount = req.body.amount;
    const newExpense = { author, description, type, amount };

    Expense.create(newExpense, (err, expense) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/expenses');
        }
    });
});

module.exports = router;