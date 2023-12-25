import http from "http";
import { app } from "./app.js";
import { loadPlanetsData } from "./models/plantes.model.js";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
	await loadPlanetsData();

	server.listen(PORT, (req, res) => {
		console.log(`server is running on port http://localhost:${PORT} ...`);
	});
}

startServer();
