var express = require("express"),
	router  = express.Router(),
	middleware = require("../middleware/index");

//USERS SHOW ROUTE
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    res.render('users/show');
});

module.exports = router;