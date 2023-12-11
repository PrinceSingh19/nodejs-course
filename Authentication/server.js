const express = require("express");
const passport = require("passport");
const app = express();

app.get("/", (req, res) => res.send("HIi"));
app.listen(3000, (req, res) => {
	console.log("server is listening");
});
