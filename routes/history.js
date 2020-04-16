var express    = require("express"),
	router     = express.Router(),
	Expense    = require("../models/expense"),
	moment     = require("moment"),
	middleware = require("../middleware/index");

//HISTORY ROUTE
router.get('/', middleware.isLoggedIn, function(req, res) {
    Expense.aggregate([
        // First Stage
        {
            $match: {
			$and:[{createdAt: { $gte: new Date(moment("1 1", 'DD MM')), $lt: new Date(moment("1 1", 'DD MM').add(1, 'year')) }},
				 {"author.id": req.user._id} ]	
            }
        },
        // Second Stage
        {
            $group: {
                _id: { $dateToString: { format: '%m-%Y', date: '$createdAt' } },
				expenses: { $push: "$$ROOT" },
                totalExpensesAmount: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        },
        // Third Stage
        {
            $sort: { _id: 1 }
        }
    ], function(err, expenses){
		if (err){
			console.log(err);
		} else {
			res.render("expenses/history", {expenses: expenses, page:"history"});
		}
	});
});

module.exports = router;