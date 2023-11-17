const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
	res.send("<ul><li>HI</li></ul>");
});

const array = [{ id: 1, name: "Prince Singh" }];
app.post("/messages", (req, res) => {
	console.log(req.body);
	array.push(req.body);
	res.send(array);
});

app.get("/messages/:id", (req, res) => {
	console.log(req.params.id);
	res.send(array[req.params.id]);
});
app.listen(PORT, () => {
	console.log("Sever is up and running.....");
});
