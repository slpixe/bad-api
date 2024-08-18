// index.ts
import express, {Request, Response} from "express";
import {randomErrorMiddleware} from "./middleware.js";
import {jsonPayload} from "./json.js";
import {createAdminRouter} from "./admin/admin.js";
import {createServer} from "http";
import {initializeWebSocket} from "./ws.js";
import {settingsRouter} from "./settings/settings-route.js";

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

initializeWebSocket(httpServer);

function handleError(res: Response, error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({message: error.message});
    } else {
        res.status(400).json({message: 'An unknown error occurred'});
    }
}

// Middleware to parse JSON bodies
app.use(express.json());

const adminRouter = createAdminRouter();
app.use('/admin', adminRouter);

// Use the settings router
app.use('/settings', settingsRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send('hmmm')
});

app.get("/good", (req: Request, res: Response) => {
    res.status(200).send('good')
});

app.get("/bad-client", (req: Request, res: Response) => {
    res.status(400).send('no')
});

app.get("/bad-server", (req: Request, res: Response) => {
    res.status(500).send('no')
});

app.get("/error", (req: Request, res: Response, next: express.NextFunction) => {
    throw new Error("Something broke!");
});

app.get("/json", (req: Request, res: Response) => {
    res.json(jsonPayload);
});

app.get("/jsonp", (req: Request, res: Response) => {
    res.jsonp({message: "Hello, World!"});
});

app.get("/redirect", (req: Request, res: Response) => {
    res.redirect("/new-location");
});

app.use("/rand-error", randomErrorMiddleware);
app.get("/rand-error", (req: Request, res: Response) => {
    res.status(200).send({status: 200, message: '=rand-error successful'});
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

httpServer.listen(3001, () => {
    console.log(`[server]: Server is running at http://localhost:3001`);
});
