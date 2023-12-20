const path = require("path");
const jwt = require("jsonwebtoken");

const users = require("../model/users");

// function to serve the login page to the user
const getLoginForm = (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "login.html"));
};

// function to handle the login request
const postLoginDetails = (req, res) => {
	// extracting the username and password from the body of the request
	const { username, password } = req.body;
	const user = users.find((user) => user.username === username);

	// sending 404 error along with the message if user is not found in the database
	if (!user) {
		return res.status(404).json({ message: "INCORRECT_USERNAME" });
	} else {
		// generating the token and with the information and sending it to the user on the client end
		const token = jwt.sign({ username: username }, "my_secret_key");

		// setting the token in the cookie so that we don't need to include it manually in each request
		res.cookie("secure_token", token, {
			httpOnly: true, // Ensures cookie cannot be accessed by JavaScript
			maxAge: 1000 * 60 * 60, // Expire in 1 hour,
		});

		// returning the response containing the token and the message
		return res.json({
			message: "sucessfully authentiacted",
			token,
		});
	}
};

module.exports = {
	getLoginForm,
	postLoginDetails,
};
