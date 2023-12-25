import { planets } from "../../models/plantes.model.js";

const getAllPlanets = (req, res) => {
	return res.status(200).json(planets);
};

export { getAllPlanets };
