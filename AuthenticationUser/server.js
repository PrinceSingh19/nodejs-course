const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { authenticate, passportMiddleWare, passportAuth } = require("./passport");
const loginRouter = require("./routes/loginRouter");

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

app.use("/login", loginRouter);
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
