import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { planetsRouter } from "./routes/planets/planets.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(path.join(__dirname, "..", "public", "index.html"));

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
	res.sendFile(
		"C:/Users/princ/Desktop/FronEndDevelopment Personal/NodeJS Udemy/NASA Project/server/public/index.html"
	);
});

app.use(planetsRouter);

export { app };
