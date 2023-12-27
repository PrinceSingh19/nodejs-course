import { launches } from "../../models/launches.model.js";

const getAllLaunches = (req, res) => {
	return res.status(200).json(Array.from(launches));
};

export { getAllLaunches };
