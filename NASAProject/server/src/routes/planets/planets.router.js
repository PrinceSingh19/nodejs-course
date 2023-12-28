import express from "express";
import { httpGetPlanets } from "./planets.controller.js";

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetPlanets);

export { planetsRouter };
