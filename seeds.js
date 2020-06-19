const Expense = require('./models/expense');

function seedDB(type, desc, amount, perDays) {
	for (let i = 0; i < 6; i++) {
		for (let j = 3; j < 30; j += perDays) {
			var seeds = {
				type: type,
				amount: (amount * Math.random()).toFixed(2),
				description: desc,
				author: {
					id: '5ee9cdfb3a7d2e00175de4a7',
					username: 'User'
				},
				createdAt: new Date(2020, i, j)
			};
			Expense.create(seeds, (err, expense) => {
				if (err) {
					console.log(err);
				} else {
				}
			});
		}
	}
}

// seedDB('Groceries', 'Super market', 50, 5);
// seedDB('Home', 'Ikea', 70, 14);
// seedDB('Food & Drinks', "O' Learys", 30, 7);
// seedDB('Holiday & Travelling', 'Road trip', 200, 20);
// seedDB('Leisure & Entertainment', 'Games.com', 50, 10);
// seedDB('Shopping', 'Zara', 100, 14);
// seedDB('Transportation', 'Gas', 40, 7);

//export when in need of seeding
// module.exports = seedDB();
