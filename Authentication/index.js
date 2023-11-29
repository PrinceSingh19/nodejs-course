const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const PORT = 3000;

//express application code
const app = express();

//helmet middleware
app.use(helmet());

//get request to home
app.get("/", (req, res) => {
	res.send({ error: "You are ready to go!" });
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
