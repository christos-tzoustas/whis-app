var mongoose = require("mongoose");

// SETUP SCHEMA

var expenseSchema = new mongoose.Schema({
	type: String,
	amount: Number,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
		    ref: "User"
		},
		username: String
	},
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);