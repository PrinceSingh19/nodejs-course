const passport = require("passport");
const express = require("express");
const loginRouter = express.Router();

const { getLoginForm, postLoginDetails } = require("../controllers/loginController");

loginRouter.get("/", getLoginForm);
loginRouter.post(
	"/",
	passport.authenticate("local", { failureRedirect: "/login", session: false }),
	postLoginDetails
);

module.exports = loginRouter;
