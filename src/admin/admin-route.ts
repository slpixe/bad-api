// src/admin/admin-route.ts

import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// Create __dirname equivalent for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Define the project root based on where the Node.js process is started
const projectRoot = process.cwd();

export const adminRouter = express.Router();

// adminRouter.use("/", express.static(path.join(__dirname, "../admin-page")));
adminRouter.use("/", express.static(path.join(projectRoot, "public/admin-page")));

adminRouter.get("/aaa", (req, res) => {
	res.status(200).send("Admin!");
});
