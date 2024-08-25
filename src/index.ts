// index.ts

import { createServer } from "node:http";
import express from "express";
import { adminRouter } from "./admin/admin-route.js";
import { otherRoutes } from "./other-routes.js";
import { settingsRouter } from "./settings/settings-route.js";
import { initializeWebSocket } from "./ws.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/settings", settingsRouter);
app.use("/", otherRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

httpServer.listen(3001, () => {
	console.log("[server]: Server is running at http://localhost:3001");
});
