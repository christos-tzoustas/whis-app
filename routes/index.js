var express  = require('express'),
    router   = express.Router(),
    passport = require('passport');

//LOGIN ROUTE
router.get('/login', function(req, res) {
    res.render('login');
});

//HANDLING LOGIN LOGIC
router.post('/login',
  passport.authenticate('local', { 
                                   failureRedirect: '/login',
                                   failureFlash: true }),
  function(req, res) {
	req.flash('success', "Welcome back " + req.user.username + "!");
    res.redirect('/expenses');
  });

//LOGOUT ROUTE
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', "You have  logged out, we 'll miss you! ");
    res.redirect('/login');
});

module.exports = router;