const API_URL = "http://localhost:5000";
// Load planets and return as JSON.
async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	const data = await response.json();
	return data;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
	const response = await fetch(`${API_URL}/launches`);
	const data = await response.json();
	return data.sort((a, b) => a.launchDate - b.launchDate);
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
	try {
		return await fetch(`${API_URL}/launches`, {
			method: "post",
			body: JSON.stringify(launch),
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: "delete",
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
