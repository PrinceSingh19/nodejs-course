import express from "express";
import { httpDeleteLaunch, httpGetLaunches, httpPostLaunches } from "./launches.controller.js";

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpPostLaunches);
launchesRouter.delete("/:id", httpDeleteLaunch);

export { launchesRouter };
