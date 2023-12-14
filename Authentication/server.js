const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { authenticate, passportMiddleWare, passportAuth } = require("./passportAuth");

const cookieExtractor = (req) => {
	let token = null;
	console.log(req.cookes, "cookies", "lgisgj");
	if (req && req.cookies) {
		token = req.cookies["secure_token"];
	}
	return token;
};

require("dotenv").config();
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
passportMiddleWare();
passportAuth();
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", authenticate, (req, res) => res.send("Hi"));
app.get("/secret", authenticate, (req, res) => {
	res.send("secret value is 19");
});
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, ".", "public", "login.html"));
});
app.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login", session: false }),
	(req, res) => {
		console.log(req.user);
		if (!req.user) {
			res.status(404).json({ message: "Not found " });
		} else {
			const token = jwt.sign(req.user, "my_secret_key");
			console.log(token, " login token");
			res.cookie("secure_token", token, {
				httpOnly: true, // Ensures cookie cannot be accessed by JavaScript
				secure: true, // Only send cookie over HTTPS (recommended)
				maxAge: 36000000, // Expire in 1 hour,
			});
			return res.json({
				message: "sucessfully authentiacted",
				token,
			});
		}
	}
);

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
