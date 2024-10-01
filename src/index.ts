// index.ts

import { createServer } from "node:http";
import express from "express";
import helmet from "helmet";
import { configRouter } from "./routes/config-route.js";
import { apiRoutes } from "./routes/api-routes.js";
import { configApiRouter } from "./routes/config-api-route.js";
import { initializeWebSocket } from "./ws.js";
import {assetsRouter} from "./routes/assets-route.js";
import {homeRouter} from "./routes/home-route.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

app.use(helmet());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/", homeRouter);
app.use("/api", apiRoutes);
app.use("/assets", assetsRouter);
app.use("/config", configRouter);
app.use("/config-api", configApiRouter);
// app.use("/demo", {});

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
