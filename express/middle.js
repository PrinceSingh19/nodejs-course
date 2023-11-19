const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	const start = Date.now();
	console.log(`${req} ${res} ${start}`);
	next();
});
app.get("/", (req, res) => {
	res.send("<ul><li>HI</li></ul>");
});

const array = [
	{ id: 1, name: "Prince Singh" },
	{ id: 2, name: "Kathan Dhagai" },
];
app.post("/messages", (req, res) => {
	console.log(req.body);
	array.push(req.body);
	res.send(array);
});

app.get("/messages/:id", (req, res) => {
	//good idea is to always validate the user input
	const id = Number(req.params.id);
	console.log(id);
	const friend = array[id];
	console.log(friend);
	if (friend) {
		res.status(200).json(friend);
	} else {
		res.status(400).json({ error: "Friend does not exist" });
	}
});
app.listen(PORT, () => {
	console.log("Sever is up and running.....");
});
