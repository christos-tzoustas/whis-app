var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
    avatar: String,
	email: String,
	lastLogin: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);