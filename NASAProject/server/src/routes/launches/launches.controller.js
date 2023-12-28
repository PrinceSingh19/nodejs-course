import {
	abortLaunch,
	addNewLaunch,
	existingLaunches,
	getAllLaunches,
} from "../../models/launches.model.js";

const httpGetLaunches = (req, res) => {
	return res.status(200).json(getAllLaunches());
};

const httpPostLaunches = (req, res) => {
	const launch = req.body;

	if (!launch.mission || !launch.destination || !launch.launchDate || !launch.rocket) {
		return res.status(400).json({
			error: "Please provide all the fields",
		});
	}
	launch.launchDate = new Date(launch.launchDate);

	if (isNaN(launch.launchDate)) {
		return res.status(400).json({
			error: "Invalid Launch date",
		});
	}

	addNewLaunch(launch);
	return res.status(201).json(launch);
};

const httpDeleteLaunch = async (req, res) => {
	const id = Number(req.params.id);

	if (!existingLaunches(id)) {
		return res.status(400).json({
			error: "Launch not found",
		});
	}
	const abort = await abortLaunch(id);
	return res.status(201).json(abort);
};

export { httpGetLaunches, httpPostLaunches, httpDeleteLaunch };
