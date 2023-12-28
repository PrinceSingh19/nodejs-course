const launches = new Map();

let flightNumberCount = 100;
const launch = {
	flightNumber: 100,
	mission: "Kepleer Exploration X",
	rocket: "Explorer IS1",
	launchDate: new Date("December 27, 2030"),
	destination: "Kepler-442 b",
	customers: ["ZTM", "NASA"],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
}

function existingLaunches(launchId) {
	return launches.has(launchId);
}
function addNewLaunch(launch) {
	flightNumberCount++;
	launches.set(
		flightNumberCount,
		Object.assign(launch, {
			upcoming: true,
			success: true,
			flightNumber: flightNumberCount,
			customers: ["ZERO To Mastery", "NASAs"],
		})
	);
}

async function abortLaunch(launchId) {
	const abortLaunch = launches.get(launchId);
	abortLaunch.upcoming = false;
	abortLaunch.success = false;
	return abortLaunch;
}
export { launches, getAllLaunches, addNewLaunch, existingLaunches, abortLaunch };
