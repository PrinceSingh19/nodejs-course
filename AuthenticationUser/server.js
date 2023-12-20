const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const { authenticate, passportAuth } = require("./passport");
const loginRouter = require("./routes/loginRouter");

require("dotenv").config();

const app = express();
const PORT = 3000;

// middleware to parse the cookies in the incoming requests
app.use(cookieParser());

// including the passportjs middleware
passportAuth();

// using this helmet middleware to set extra attributes on the request headers
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// initialising the passportjs middleware
app.use(passport.initialize());

// home page route
app.get("/", (req, res) => res.send("Hi"));

// secret page route which requires the user to be authenticated
app.get("/secret", authenticate, (req, res) => {
	res.send("secret value is 19");
});

// login route
app.use("/login", loginRouter);
// https
// 	.createServer(
// 		{
// 			cert: fs.readFileSync("cert.pem"),
// 			key: fs.readFileSync("key.pem"),
// 		},
// 		app
// 	)
// 	.listen(PORT, (req, res) => {
// 		console.log(`Connected on https://localhost:${PORT}`);
// 	});

app.listen(PORT, (req, res) => {
	console.log(`Connected on http://localhost:${PORT}`);
});
