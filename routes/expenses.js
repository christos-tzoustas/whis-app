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
			
			res.render("expenses/index", {expenses: expenses});
		}
	});
});

//NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('expenses/new');
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