const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please log in first!');
	res.redirect('/login');
};

module.exports = middlewareObj;
