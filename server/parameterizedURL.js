const http = require("http");
const PORT = 3000;

const server = http.createServer();

const persons = [
	{ id: 1, name: "Prince" },
	{ id: 2, name: "Priyanka" },
	{ id: 3, name: "Prinshu" },
];

server.on("request", (req, res) => {
	const personSplit = req.url.split("/");
	console.log(personSplit);
	if (personSplit[2] != "" || personSplit[2] != null) {
		const person = persons[Number(personSplit.length - 1)];
		console.log(person);
		res.end(JSON.stringify(person));
	} else if (personSplit[1] === "/person") {
		res.end(JSON.stringify(persons));
	}
	//! sending the html response with the res.write()
	else if (req.url === "/messages") {
		res.statusCode = 200;
		res.setHeader = "application/json";
		res.end(
			JSON.stringify({
				hi: "HI",
				hello: "Hello",
			})
		);
	} else if (req.url === "/page") {
		res.statusCode = 200;
		res.setHeader = "text/html";
		res.write("<html>");
		res.write("<body>");
		res.write("<p> Hi my name is <strong>Prince Singh</p>");
		res.write("</body>");
		res.write("</html>");
		res.end();
	} else if (req.url === "/") {
		res.end("This is the homepage Enjoy!");
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(PORT, () => {
	console.log("Server connected successfully");
});
