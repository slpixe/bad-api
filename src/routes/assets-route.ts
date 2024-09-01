// src/routes/assets-route.ts

import path from "path";
import express from "express";

// Define the project root based on where the Node.js process is started
const projectRoot = process.cwd();

export const assetsRouter = express.Router();

assetsRouter.use(
	"/",
	express.static(path.join(projectRoot, "public/assets")),
);
