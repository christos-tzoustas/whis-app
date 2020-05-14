require('dotenv').config();

var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    localStrategy  = require('passport-local'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    User           = require('./models/user'),
    Expense        = require('./models/expense'),
    seedDB         = require('./seeds'),
	flash          = require("connect-flash");



//REQUIRING ROUTES
var expensesRoutes = require("./routes/expenses"),
	indexRoutes    = require("./routes/index"),
	usersRoutes    = require("./routes/users"),
	historyRoutes  = require("./routes/history"),
	detailsRoutes  = require("./routes/details");

//APP CONFIG

mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/expense_tracker_v2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.locals.moment = require('moment');
// seedDB(); //seeding database
app.use(flash());

//PASSPORT CONFIG
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
    next();
});

//ROUTES CONFIG
app.use("/expenses", expensesRoutes);
app.use("/users", usersRoutes);
app.use(indexRoutes);
app.use("/expenses-history", historyRoutes);
app.use("/expenses/:id/details", detailsRoutes);

//SERVER CONFIG
app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('Expenses tracker app server is listening');
});