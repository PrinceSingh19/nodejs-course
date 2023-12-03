const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const PORT = 3000;

const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
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
//express application code
const app = express();
//to serve the static files stored on the server inside the public folder
app.use(express.static(path.join(__dirname, ".", "public")));

//helmet middleware
app.use(helmet());
app.use(passport.initialize());

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
	const isLoggedIn = true;
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
		session: false,
	}),
	(req, res) => console.log("Google Called us  back!")
);

app.get("/auth/logout", (req, res) => {});
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
		console.log("Server is connected and running");
	});
