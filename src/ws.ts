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

    // Send welcome message
    socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

    // Send initial config to the client
    const allConfig = configStore.getConfig();
    socket.emit("configSync", allConfig);

    // Listen for config updates
    socket.on("configSync", (updates: { [key: string]: any }) => {
      console.log("Received config update:", updates);

      try {
        // Convert updates object to array of name/value pairs
        const updateArray = Object.entries(updates).map(([name, value]) => ({
          name,
          value
        }));

        // Update the config store
        configStore.updateConfig(updateArray);

        // Get the updated config and broadcast to all clients
        const currentConfig = configStore.getConfig();
        io.emit("configSync", currentConfig);

      } catch (error: unknown) {
        console.error("Error updating config:", error);
        handleError(error);
        socket.emit("error", { message: "Failed to update configuration" });
      }
    });

    // Handle adding a new dynamic route
    socket.on("addDynamicRoute", (routeData: { path: string, payload?: any }) => {
      console.log("Adding dynamic route:", routeData);
      try {
        configStore.addDynamicRoute(routeData.path, routeData.payload);
        refreshDynamicRoutes();
        
        // Broadcast updated config to all clients
        const currentConfig = configStore.getConfig();
        io.emit("configSync", currentConfig);
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
        refreshDynamicRoutes();
        
        // Broadcast updated config to all clients
        const currentConfig = configStore.getConfig();
        io.emit("configSync", currentConfig);
      } catch (error: unknown) {
        handleError(error);
        socket.emit("error", { message: "Failed to remove dynamic route" });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("=socket.io disconnected");
    });
  });
}
