// src/config/config-route.ts

import path from "path";
import express from "express";

// Define the project root based on where the Node.js process is started
const projectRoot = process.cwd();

export const configRouter = express.Router();

configRouter.use(
	"/",
	express.static(path.join(projectRoot, "public/config-page")),
);

configRouter.get("/aaa", (req, res) => {
	res.status(200).send("Config!");
});
