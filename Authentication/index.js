const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const PORT = 3000;
const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	SECRET_KEY1: process.env.SECRET_KEY1,
	SECRET_KEY2: process.env.SECRET_KEY2,
};

const AuthOptions = {
	callbackURL: "/auth/google/callback",
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
	console.log("Google Profile !", profile);
	done(null, profile);
}

passport.use(new Strategy(AuthOptions, verifyCallback));
//It saves the session to the cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

//It is used to read the session from cookie
passport.deserializeUser((id, done) => {
	done(null, id);
});
//express application code
const app = express();
// apply this helmet middleware first to suppress the extra headers and before running any other middleware.
//helmet middleware
app.use(helmet());

//to serve the static files stored on the server inside the public folder
app.use(express.static(path.join(__dirname, ".", "public")));

//initialize the session after the helmet so that the endpoints are secured and need to add befor passport so that it can use the session info
app.use(
	cookieSession({
		name: "session",
		maxAge: 60 * 1000,
		keys: [config.SECRET_KEY1, config.SECRET_KEY2], //Add two different keys so that when on key needs to change then the other key handles the request until every user is on the latest key. second key helps in key rotation
	})
);

app.use((req, res, next) => {
	// Stub out missing regenerate and save functions.
	// These don't make sense for client side sessions.
	if (req.session && !req.session.regenerate) {
		req.session.regenerate = (cb) => {
			cb();
		};
	}
	if (req.session && !req.session.save) {
		req.session.save = (cb) => {
			cb();
		};
	}

	next();
});

app.use(passport.initialize());
app.use(passport.session());

//check if user is logged in

// middleware approach
// app.use((req, res, next) => {
// 	const isLoggedIn = false;
// 	const excludeRoutes = ["/secret", "campaign"];

// 	if (excludeRoutes.includes(req.path)) {
// 		next();
// 	} else {
// 		if (!isLoggedIn) {
// 			return res.status(401).json({
// 				error: "You must be logged in",
// 			});
// 		}
// 		next();
// 	}
// });

function checkLoginStatus(req, res, next) {
	console.log(`User is ${req.user}`);
	const isLoggedIn = req.isAuthenticated() && req.user;
	const excludeRoutes = ["/", "/campaign"];

	if (excludeRoutes.includes(req.path)) {
		next();
	} else {
		if (!isLoggedIn) {
			return res.status(401).json({
				error: "You must be logged in",
			});
		}
		next();
	}
}

//get request to home
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, ".", "public", "index.html"));
});

//get request for secret endpoint
//! you can add as many as middlewares after the checkLoginStatus function and all the functions will be executed in sequential manner.
//? by using this approach you can add the login check on the specific endpoint and not all the endpoints
app.get("/secret", checkLoginStatus, (req, res) => {
	res.send("Your secret value is 19!");
});

//function for google authentication
app.get("/auth/google", passport.authenticate("google", { scope: ["email"] }));
app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/failure",
		successRedirect: "/",
		session: true,
	}),
	(req, res) => console.log("Google Called us  back!")
);

//Removes req.user and clears any logged in session
app.get("/auth/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		return res.redirect("/");
	});
});
app.get("/failure", (req, res) => {
	res.send("Failed to log in!");
});

// https server creation
https
	.createServer(
		{
			cert: fs.readFileSync("cert.pem"),
			key: fs.readFileSync("key.pem"),
		},
		app
	)
	.listen(PORT, (req, res) => {
		console.log(`Connected on https://localhost:${PORT}`);
	});
