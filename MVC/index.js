const express = require("express");
const friendsRouter = require("./routers/friends.router");
const messagesRouter = require("./routers/messages.router");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use((req, res, next) => {
	const start = Date.now();
	next();
	const Delta = Date.now() - start;
	console.log(`${req.method} ${req.url} ${Delta}`);
});

app.get("/", (req, res) => {
	res.send("<p>Hi my name is <strong>Prince Singh</strong></p>");
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
	console.log("Server is connect and running....");
});
