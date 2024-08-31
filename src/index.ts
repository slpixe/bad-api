// index.ts

import { createServer } from "node:http";
import express from "express";
import helmet from "helmet";
import { adminRouter } from "./admin/admin-route.js";
import { otherRoutes } from "./other-routes.js";
import { configRouter } from "./config/config-route.js";
import { initializeWebSocket } from "./ws.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

// app.use(helmet());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api", otherRoutes);
app.use("/config", configRouter);
app.use("/admin", adminRouter);
// app.use("/demo", {});

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
