var mongoose = require('mongoose'),
	Expense = require('./models/expense');

var seeds = {
	type: "groceries",
	amount: "200",
	description: "Poutses",
	author: {
		id: "5e8352f39129a543729a1df1" ,
		username: "Christos"
	},
	createdAt: "2021-08-25"
}

function seedDB () {
	Expense.create(seeds, function(err, seed){
		if (err) {
			console.log(err);
		} else {
			console.log (seed);
		}
	})
}

module.exports = seedDB;