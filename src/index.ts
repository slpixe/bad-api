// index.ts

import {createServer} from "node:http";
import express from "express";
import {adminRouter} from "./admin/admin-route.js";
import {otherRoutes} from "./other-routes.js";
import {settingsRouter} from "./settings/settings-route.js";
import {initializeWebSocket} from "./ws.js";
import {createProxyMiddleware} from "http-proxy-middleware";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

// Middleware to parse JSON bodies
app.use(express.json());

// Define the proxy for WebSocket connections
// const wsProxy = createProxyMiddleware("/ws", {
// 	target: "http://localhost:3001", // WebSocket server address
// 	changeOrigin: true,
// 	ws: true,
// 	//agent: process.env.HTTP_PROXY ? new HttpsProxyAgent(process.env.HTTP_PROXY) : undefined,
// });

// const wsProxy = createProxyMiddleware({
// 	target: "http://localhost:3001", // WebSocket server address
// 	changeOrigin: true,
// 	ws: true,
// 	pathRewrite: {
// 		'^/ws': '',  // This ensures that requests to /ws are correctly proxied to the WebSocket server
// 	},
// 	// logLevel: "debug", // Optional: for logging the proxy requests
// });
//
// app.use("/ws", wsProxy);

app.use("/admin", adminRouter);
app.use("/settings", settingsRouter);
app.use("/", otherRoutes);

// const thing = app.listen(port, () => {
// 	console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// httpServer.listen(3001, () => {
// 	console.log("[server]: Server is running at http://localhost:3001");
// });

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

// thing.on("upgrade", wsProxy.upgrade);
