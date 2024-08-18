// index.ts
import express, {Request, Response} from "express";
import {randomErrorMiddleware} from "./middleware.js";
import {jsonPayload} from "./json.js";
import {adminRouter} from "./admin/admin-route.js";
import {createServer} from "http";
import {initializeWebSocket} from "./ws.js";
import {settingsRouter} from "./settings/settings-route.js";
import {otherRoutes} from "./other-routes.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/settings', settingsRouter);
app.use('/', otherRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

httpServer.listen(3001, () => {
    console.log(`[server]: Server is running at http://localhost:3001`);
});
