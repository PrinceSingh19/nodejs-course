const path = require("path");
const jwt = require("jsonwebtoken");

const getLoginForm = (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "login.html"));
};

const postLoginDetails = (req, res) => {
	console.log(req.user);
	if (!req.user) {
		res.status(404).json({ message: "Not found " });
	} else {
		const token = jwt.sign(req.user, "my_secret_key");
		console.log(token, " login token");
		res.cookie("secure_token", token, {
			httpOnly: true, // Ensures cookie cannot be accessed by JavaScript
			secure: true, // Only send cookie over HTTPS (recommended)
			maxAge: 36000000, // Expire in 1 hour,\
		});
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
