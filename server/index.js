const http = require("http");
const PORT = 3000;

const server = http.createServer();

server.on("request", (req, res) => {
	// one way of writing the content type and sending the stauts code
	/* res.writeHead(200, {
		"Content-Type": "application/json",
	});
	res.end(
		JSON.stringify({
			name: "Prince Singh",
			age: 23,
			phone: 973122796,
		})
	); */

	// another way of writing

	//! sending the json response with the res.end()
	// res.statusCode = 200;
	// res.setHeader = "application/json";
	// res.end(
	// 	JSON.stringify({
	// 		name: "Prince Singh",
	// 		age: 23,
	// 		phone: 973122796,
	// 	})
	// );

	//! sending the html response with the res.write()

	if (req.url === "/messages") {
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
