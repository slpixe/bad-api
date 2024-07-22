import express, {Request, Response} from "express";
import {randomErrorMiddleware} from "./middleware.js";
import {jsonPayload, jsonString} from "./json.js";
import {createAdminRouter} from "./admin.js";

const app = express();
const port = process.env.PORT || 3000;

type Settings = {
    [key: string]: any;
};
const settings: Settings = {
    version: 'v1',
    quote: 'yep that',
    // other settings...
};

const adminRouter = createAdminRouter();
app.use('/admin', adminRouter);

app.get('/settings', (req, res) => {
    res.status(200).send(settings);
});

app.put('/settings', (req, res) => {
    const { name, value } = req.body;
    if (name in settings) {
        settings[name] = value;
        res.status(200).send({ message: 'Setting updated successfully' });
    } else {
        res.status(404).send({ message: 'Setting not found' });
    }
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