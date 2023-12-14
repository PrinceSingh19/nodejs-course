const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("./server.js");

const users = ["Prince", "Kathan", "Keshav", "Clarissa"];
function verifyCallback(username, password, done) {
	console.log(username, password);
	const user = users.find(username);
	if (!user) {
		return done(null, false);
	} else {
		return done(null, user);
	}
}
passport.use(new LocalStrategy(verifyCallback));

module.exports = passport;
