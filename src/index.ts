// index.ts

import { createServer } from "node:http";
import express from "express";
import helmet from "helmet";
import { adminRouter } from "./admin/admin-route.js";
import { otherRoutes } from "./other-routes.js";
import { settingsRouter } from "./settings/settings-route.js";
import { initializeWebSocket } from "./ws.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

// app.use(helmet());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/settings", settingsRouter);
app.use("/", otherRoutes);

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
