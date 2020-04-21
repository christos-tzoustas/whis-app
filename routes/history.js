var express = require('express'),
    router = express.Router(),
    Expense = require('../models/expense'),
    moment = require('moment'),
    middleware = require('../middleware/index');

//HISTORY ROUTE
router.get('/', middleware.isLoggedIn, function(req, res) {
    Expense.aggregate(
        [
            // First Stage
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: new Date(moment('1 1', 'DD MM')),
                                $lt: new Date(moment('1 1', 'DD MM').add(1, 'year'))
                            }
                        },
                        { 'author.id': req.user._id }
                    ]
                }
            },
            // Second Stage
            {
                $group: {
                    _id: { $dateToString: { format: '%m', date: '$createdAt' } },
                    expenses: { $push: '$$ROOT' },
                    totalExpensesAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }, 
			{
    $addFields: {
        month: {
            $let: {
                vars: {
					month: { $toInt: "$_id" },
                    monthsInString: [,'January', 'February', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December"]
                },
                in: {
                    $arrayElemAt: ['$$monthsInString', '$$month']
                }
            }
        }
    }
},
            // Third Stage
            {
                $sort: { _id: 1 }
            }
        ],
        function(err, expenses) {
            if (err) {
                console.log(err);
            } else {
                if (expenses.length < 1) {
                    req.flash('success', 'No data to show. Add expenses to begin :) ');
                    res.redirect('/expenses/new');
                } else {
					
                    res.render('expenses/history', { expenses: expenses, page: 'history' });
                }
            }
        }
    );
});

module.exports = router;