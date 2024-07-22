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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});