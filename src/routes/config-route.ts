// src/config/config-route.ts

import path from "path";
import express from "express";

// Define the project root based on where the Node.js process is started
const projectRoot = process.cwd();

export const configRouter = express.Router();

// Serve the built React app
configRouter.use(
  "/",
  express.static(path.join(projectRoot, "client/config/dist")),
);

// Serve the assets (including simple.css)
configRouter.use(
  "/assets",
  express.static(path.join(projectRoot, "client/config/public/assets")),
);

// Fallback route for client-side routing
configRouter.get("*", (req, res) => {
  res.sendFile(path.join(projectRoot, "client/config/dist/index.html"));
});
