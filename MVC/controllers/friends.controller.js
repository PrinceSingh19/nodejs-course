const friends = require("../model/friends.model");

function getFriends(req, res) {
	res.send(friends);
}

function getSingleFriend(req, res) {
	const id = Number(req.params.id);
	if (!id) {
		return res.status(404).send({ error: "Friend not found" });
	}
	const friend = friends[id - 1];
	if (!friend) {
		return res.status(404).send({ error: "Friend not found" });
	}
	res.send(friend);
}
function postFriend(req, res) {
	const friend = req.body.name;
	// if friend is not found
	if (!friend) {
		return res.status(400).send({ error: "Provide valid name" });
	}
	const friendObj = {
		name: friend,
		id: friends.length + 1,
	};
	friends.push(friendObj);
	res.send(friendObj);
}

module.exports = { getFriends, getSingleFriend, postFriend };
