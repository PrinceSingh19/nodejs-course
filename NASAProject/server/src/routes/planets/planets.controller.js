import { getAllPlanets } from "../../models/plantes.model.js";

const httpGetPlanets = (req, res) => {
	return res.status(200).json(getAllPlanets());
};

export { httpGetPlanets };
