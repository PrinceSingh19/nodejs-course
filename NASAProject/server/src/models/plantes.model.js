import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isHabitablePlanet = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.6
	);
};

const planets = [];

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
			.pipe(
				parse({
					comment: "#",
					columns: true,
				})
			)
			.on("data", (data) => {
				if (isHabitablePlanet(data)) {
					planets.push(data);
				}
			})
			.on("error", (error) => {
				console.log(error);
				reject();
			})
			.on("end", () => {
				resolve();
			});
	});
}

const getAllPlanets = () => planets;

export { getAllPlanets, loadPlanetsData };
