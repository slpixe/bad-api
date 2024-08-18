/**
 * This file initializes a WebSocket server using Socket.IO. It handles
 * sending the initial state of the application to the client and updating
 * the state when the client sends an 'elementChanged' event.
 */

import {Server as WsServer} from 'socket.io';
import {Server} from 'http'
// import {SettingsStore} from "./settings/settings.js";
import {settingsStore} from "./settings/settings.js";

type ElementStates = {
    slider1: number;
    slider2: number;
    checkbox1: boolean;
    textInput1: string;
};

type ElementUpdate = {
    [K in keyof ElementStates]: { id: K; value: ElementStates[K] };
}[keyof ElementStates]; // Creates a union type for all possible updates

export function initializeWebSocket(httpServer: Server): void {
    const io = new WsServer(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const elementStates: ElementStates = {
        slider1: 50,
        slider2: 75,
        checkbox1: true,
        textInput1: 'Hello World'
    };

    io.on('connection', (socket) => {
        console.log('=socket.io connected');

        // Send initial state to the client
        for (const [id, value] of Object.entries(elementStates)) {
            socket.emit('elementUpdate', { id, value, type: typeof value });
        }

        // Handle the 'disconnect' event more efficiently
        socket.on('disconnect', () => {
            console.log('=socket.io disconnected');
        });

        socket.on('elementChanged', (data: ElementUpdate) => {
            console.log(`Element ${data.id} updated to ${data.value}`);

            // Update the server state
            if (typeof data.value === 'string') {
                elementStates[data.id] = data.value as string;
            }

            if(typeof data.value === 'number') {
                elementStates[data.id] = data.value as number;
            }

            if(typeof data.value === 'boolean') {
                elementStates[data.id] = data.value as boolean;
            }

            // const settingsStore = new SettingsStore();
            // Example: Accessing settings
            // const currentSettings = settingsStore.getSettings();
            // console.log(currentSettings);

// Example: Updating a setting
//             settingsStore.updateSetting('networkDelay', 100);

// Example: Updating multiple settings
            settingsStore.updateSettings([
                { name: 'version', value: 'v2' },
                { name: 'quote', value: 'new quote' }
            ]);

            settingsStore.updateSetting(data.id, data.value);
            const newSettings = settingsStore.getSettings();

            // Broadcast the new value to all clients
            io.emit('elementUpdate', { id: data.id, value: data.value, type: typeof data.value });
        });
    });
}