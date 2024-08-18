// import express, {hasOwnProperty, Request, Response} from "express";
import express, {Request, Response} from "express";
import {randomErrorMiddleware} from "./middleware.js";
import {jsonPayload} from "./json.js";
import {createAdminRouter} from "./admin/admin.js";
import {initialSettings, SettingsStore} from "./settings.js";
import {createServer} from "http";
import {Server} from 'socket.io';

type ElementStates = {
    slider1: number;
    slider2: number;
    checkbox1: boolean;
    textInput1: string;
};

type ElementUpdate = {
    [K in keyof ElementStates]: { id: K; value: ElementStates[K] };
}[keyof ElementStates]; // Creates a union type for all possible updates

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Allow requests from this origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

function handleError(res: Response, error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({message: error.message});
    } else {
        res.status(400).json({message: 'An unknown error occurred'});
    }
}

// app.use(bodyParser.json()); // for parsing JSON bodies
// Middleware to parse JSON bodies
app.use(express.json());

// type Settings = {
//     [key: string]: any;
// };
// const settings: Settings = {
//     version: 'v1',
//     quote: 'yep that',
//     // other settings...
// };

const settingsStore = new SettingsStore(initialSettings);
// const settings = settingsStore.getSettings();
// console.log("=start of app settings", settings);

const adminRouter = createAdminRouter();
app.use('/admin', adminRouter);

app.get('/settings', (req, res) => {
    const latestSettings = settingsStore.getSettings();
    res.status(200).send({settings: latestSettings});
});

app.put('/settings', (req: Request, res: Response) => {
    console.log('=req.body', typeof req.body, req.body);

    const {name, value, settings} = req.body;
    console.log('=name, value, settings', name, value, settings);

    try {
        if (settings && Array.isArray(settings)) {
            // Update multiple settings
            settingsStore.updateSettings(settings);
            res.status(200).json({message: 'Settings updated successfully', settings: settingsStore.getSettings()});
        } else if (name && value !== undefined) {
            // Update a single setting
            settingsStore.updateSetting(name, value);
            res.status(200).json({
                message: `Setting '${name}' updated successfully`,
                settings: settingsStore.getSettings()
            });
        } else {
            res.status(400).json({message: 'Invalid request. Provide either a single setting or an array of settings.'});
        }
    } catch (error: unknown) {
        handleError(res, error);
    }

    // try {
    //     settingsStore.updateSetting(name, value);
    //     res.status(200).send({ message: 'Setting updated successfully' });
    // } catch (error: unknown) {
    //     if (error instanceof Error) {
    //         res.status(400).send({ message: error.message });
    //     } else {
    //         res.status(400).send({ message: 'An unknown error occurred' });
    //     }
    // }
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

    socket.on('elementChanged', (data: ElementUpdate) => {
        console.log(`Element ${data.id} updated to ${data.value}`);

        // Update the server state
        elementStates[data.id] = data.value;

        // Broadcast the new value to all clients
        io.emit('elementUpdate', { id: data.id, value: data.value, type: typeof data.value });
    });

    socket.on('disconnect', () => {
        console.log('=socket.io disconnected');
    });
});


app.get("/", (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
    res.status(200).send('hmmm')
});

app.get("/good", (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
    res.status(200).send('good')
});

app.get("/bad-client", (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
    res.status(400).send('no')
});

app.get("/bad-server", (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
    res.status(500).send('no')
});

app.get("/error", (req: Request, res: Response, next: express.NextFunction) => {
    throw new Error("Something broke!");
});

// app.get("/json", (req: Request, res: Response) => {
//     res.json({message: "Hello, World!"});
// });
app.get("/json", (req: Request, res: Response) => {
    res.json(jsonPayload);
});

// app.get("/json-string", (req: Request, res: Response) => {
//     res.json(jsonString);
// });

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