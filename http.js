// Code for the nodejs http and https

const { request, get } = require("https");

const req = request("https://www.google.com", (res) => {
	console.log("Response is receiving ===");

	res.on("data", (chunk) => console.log(`data chunk is: ${chunk}`));
	res.on("end", () => console.log("Responde ended and there is no more data"));
});

// if you are making request using the request object then you need to pass this explicitly otherwise nothing will happen
req.end();

//code for the get request
get("https://www.google.com", (res) => {
	console.log("Response is receiving in the get ===");

	res.on("data", (chunk) => console.log(`data chunk in the get function is: ${chunk}`));
});
