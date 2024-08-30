// ws.ts

/**
 * This file initializes a WebSocket server using Socket.IO. It handles
 * sending the initial state of the application to the client and updating
 * the state when the client sends an 'elementChanged' event.
 */

import type { Server } from "node:http";
import { Server as WsServer } from "socket.io";
import { handleError } from "./settings/settings-route.js";
import { settingsStore } from "./settings/settings.js";

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
		socket.emit('welcome', { message: 'Welcome to the WebSocket server!' });

		// Listen for a simple message event
		socket.on('message', (data) => {
			console.log('Received message:', data);
			// Respond back to the client
			socket.emit('message_response', { message: 'Message received', data });
		});

		// Disconnect event
		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
		//

		socket.on('message', (msg) => {
			console.log('Message received:', msg);
			socket.emit('response', 'Message received on the server!');
		});

		// Send all settings to the client on connection
		const allSettings = settingsStore.getSettings();
		socket.emit("settingsSync", allSettings);

		// Handle the 'disconnect' event more efficiently
		socket.on("disconnect", () => {
			console.log("=socket.io disconnected");
		});

		// Handle 'settingsChanged' event from the client
		socket.on(
			"settingsSync",
			(updatedSettings: { [key: string]: string | number }) => {
				console.log("Received settings from client:", updatedSettings);

				// Update the settings in the store
				try {
					settingsStore.updateSettings(
						Object.entries(updatedSettings).map(([name, value]) => ({
							name,
							value,
						})),
					);
				} catch (error: unknown) {
					handleError(error);
				}

				// Broadcast the updated settings back to the client
				const allSettings = settingsStore.getSettings();
				setTimeout(() => {
					io.emit("settingsSync", allSettings);
				}, 500);
			},
		);
	});
}
