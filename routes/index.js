const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');

//AUTHORIZATION ROUTES

//REGISTER FORM
router.get('/register', (req, res) => {
	res.render('register');
});

//HANDLING REGISTER LOGIC
router.post('/register', (req, res) => {
	var newUser = new User({
		username: req.body.username,
		email: req.body.email
	});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', 'Welcome to WHIS ' + user.username + '!');
			res.redirect('/login');
		});
	});
});

//LOGIN ROUTE
router.get('/', (req, res) => {
	res.redirect('/login');
});

router.get('/login', (req, res) => {
	res.render('login');
});

//HANDLING LOGIN LOGIC
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}),
	(req, res) => {
		req.flash('success', 'Welcome back ' + req.user.username + '!');
		res.redirect('/expenses');
	}
);

//LOGOUT ROUTE
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', "You have  logged out, we 'll miss you! ");
	res.redirect('/login');
});

module.exports = router;
