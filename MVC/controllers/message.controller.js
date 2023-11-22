const messages = require("../model/messages.model");

function getMessages(req, res) {
	res.send(messages);
}
function getSingleMessage(req, res) {
	const id = Number(req.params.id);
	if (!id) {
		return res.status(404).send({ error: "Message not found" });
	}
	const message = messages[id - 1];
	if (!message) {
		return res.status(404).send({ error: "Message not found" });
	}
	res.send(message);
}
function postMessage(req, res) {
	const messageBody = req.body.message;
	// if message is not found
	if (!messageBody) {
		return res.status(400).send({ error: "Provide valid message" });
	}
	const message = {
		name: messageBody,
		id: messages.length + 1,
	};
	messages.push(message);
	res.send(message);
}
module.exports = { getMessages, getSingleMessage, postMessage };
