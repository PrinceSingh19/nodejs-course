const express = require("express");

const messagesController = require("../controllers/message.controller");

const messagesRouter = express.Router();

messagesRouter.get("/", messagesController.getMessages);
messagesRouter.get("/:id", messagesController.getSingleMessage);
messagesRouter.post("/", messagesController.postMessage);

module.exports = messagesRouter;
