const express = require("express");
const loginRouter = express.Router();

const { getLoginForm, postLoginDetails } = require("../controllers/loginController");

// router for the GET method of the login form
loginRouter.get("/", getLoginForm);

// route for the POST method of the login form
loginRouter.post("/", postLoginDetails);

module.exports = loginRouter;
