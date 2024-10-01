// src/routes/home-route.ts

import path from "path";
import express from "express";

// Define the project root based on where the Node.js process is started
const projectRoot = process.cwd();

export const homeRouter = express.Router();

homeRouter.use(
	"/",
	express.static(path.join(projectRoot, "public/home-page")),
);

homeRouter.get("/aaa", (req, res) => {
	res.status(200).send("Config!");
});
