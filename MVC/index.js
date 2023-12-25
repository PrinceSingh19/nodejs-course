const express = require("express");
const friendsRouter = require("./routers/friends.router");
const messagesRouter = require("./routers/messages.router");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
	const start = Date.now();
	next();
	const Delta = Date.now() - start;
	console.log(`${req.method} ${req.url} ${Delta}`);
});

// way to send the html files without using render method and template engines
// app.use(express.static(path.join(__dirname, "public")));
// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, ".", "public", "index.html"));
// });

// another way to send the static website with some dynamic data
app.use("/site", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Nodejs course",
		description: "You did it Prince!",
	});
});

app.get("/messages", (req, res) => {
	res.render("messages", {
		title: "Nodejs course",
		message: "Keep doing this Prince. One day you'll make it",
	});
});
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
	console.log("Server is connect and running....");
});
