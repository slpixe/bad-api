import express, { Express, Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
    res.status(200).send('hmmm')
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

app.get("/json", (req: Request, res: Response) => {
    res.json({ message: "Hello, World!" });
});

app.get("/jsonp", (req: Request, res: Response) => {
    res.jsonp({ message: "Hello, World!" });
});

app.get("/redirect", (req: Request, res: Response) => {
    res.redirect("/new-location");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});