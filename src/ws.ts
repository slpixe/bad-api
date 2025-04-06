// ws.ts

/**
 * This file initializes a WebSocket server using Socket.IO. It handles
 * sending the initial state of the application to the client and updating
 * the state when the client sends an 'elementChanged' event.
 */

import type { Server } from "node:http";
import { Server as WsServer } from "socket.io";
import { handleError } from "./routes/config-api-route.js";
import { configStore } from "./store/config.js";
import { refreshDynamicRoutes } from "./routes/api-routes.js";

type ElementStates = {
	checkbox1: boolean;
	textInput1: string;
	networkDelay: number;
};

export function initializeWebSocket(httpServer: Server): void {
	const io = new WsServer(httpServer, {});

	io.on("connection", (socket) => {
		console.log("=socket.io connected");

		//
		// Respond to connection
		socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

		// Listen for a simple message event
		socket.on("message", (data) => {
			console.log("Received message:", data);
			// Respond back to the client
			socket.emit("message_response", { message: "Message received", data });
		});

		// Disconnect event
		socket.on("disconnect", () => {
			console.log("User disconnected");
		});
		//

		socket.on("message", (msg) => {
			console.log("Message received:", msg);
			socket.emit("response", "Message received on the server!");
		});

		// Send all config to the client on connection
		const allConfig = configStore.getConfig();
		socket.emit("configSync", allConfig);

		// Handle the 'disconnect' event more efficiently
		socket.on("disconnect", () => {
			console.log("=socket.io disconnected");
		});

		// Handle 'configChanged' event from the client
		socket.on(
			"configSync",
			(updatedConfig: { [key: string]: string | number }) => {
				console.log("Received config from client:", updatedConfig);

				// Update the config in the store
				try {
					configStore.updateConfig(
						Object.entries(updatedConfig).map(([name, value]) => ({
							name,
							value,
						})),
					);
				} catch (error: unknown) {
					handleError(error);
				}

				// Broadcast the updated config back to the client
				const allConfig = configStore.getConfig();
				setTimeout(() => {
					io.emit("configSync", allConfig);
				}, 500);
			},
		);

		// Handle adding a new dynamic route
		socket.on("addDynamicRoute", (routeData: { path: string, payload?: any }) => {
			console.log("Adding dynamic route:", routeData);
			try {
				configStore.addDynamicRoute(routeData.path, routeData.payload);
				// Re-register all dynamic routes 
				refreshDynamicRoutes();
				// Broadcast the updated config back to all clients
				io.emit("configSync", configStore.getConfig());
			} catch (error: unknown) {
				handleError(error);
				socket.emit("error", { message: "Failed to add dynamic route" });
			}
		});

		// Handle removing a dynamic route
		socket.on("removeDynamicRoute", (routePath: string) => {
			console.log("Removing dynamic route:", routePath);
			try {
				configStore.removeDynamicRoute(routePath);
				// Re-register all dynamic routes
				refreshDynamicRoutes();
				// Broadcast the updated config back to all clients
				io.emit("configSync", configStore.getConfig());
			} catch (error: unknown) {
				handleError(error);
				socket.emit("error", { message: "Failed to remove dynamic route" });
			}
		});
	});
}
