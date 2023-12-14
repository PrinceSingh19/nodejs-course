const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const users = require("./model/users");

function verifyCallback(username, password, done) {
	console.log(username, password);
	const user = users.find((user) => user.username === username);
	console.log(user, "found");
	if (!user) {
		return done(null, false);
	}
	return done(null, user);
}

var cookieExtractor = function (req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies["secure_token"];
	}
	return token;
};
function passportMiddleWare() {
	passport.use(
		new LocalStrategy({ usernameField: "username", passwordField: "password" }, verifyCallback)
	);
}

function passportAuth() {
	try {
		passport.use(
			new JwtStrategy(
				{
					jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
					secretOrKey: "my_secret_key",
				},
				function (jwt_payload, done) {
					console.log(jwt_payload, " jwt payload");
					const user = users.find((user) => jwt_payload.username === user.username);
					console.log(user, "found");
					if (!user) {
						return done(null, false);
					}

					return done(null, user);
				}
			)
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

function authenticate(req, res, next) {
	// Use Passport to authenticate the request using the "jwt" strategy
	passport.authenticate("jwt", { session: false }, (err, user) => {
		console.log(user);
		if (err) next(err); // If there's an error, pass it on to the next middleware
		if (!user) {
			// If the user is not authenticated, send a 401 Unauthorized response
			return res.status(401).json({
				message: "Unauthorized access. No token provided.",
			});
		}
		// If the user is authenticated, attach the user object to the request and move on to the next middleware
		req.user = user;
		next();
	})(req, res, next);
}

module.exports = {
	passportAuth,
	passportMiddleWare,
	authenticate,
};
