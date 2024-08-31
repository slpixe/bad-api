import express, { type Request, type Response } from "express";
import { jsonPayload } from "./json.js";
import { randomErrorMiddleware } from "./middleware.js";
import { networkDelayMiddleware } from "./middleware/networkDelay.js";
import { configStore } from "./config-api/config.js";

export const otherRoutes = express.Router();

otherRoutes.use(networkDelayMiddleware());

otherRoutes.get("/", (req: Request, res: Response) => {
	res.status(200).send("hmmm");
});

otherRoutes.get("/good", (req: Request, res: Response) => {
	res.status(200).send("good");
});

otherRoutes.get("/bad-client", (req: Request, res: Response) => {
	res.status(400).send("no");
});

otherRoutes.get("/bad-server", (req: Request, res: Response) => {
	res.status(500).send("no");
});

otherRoutes.get(
	"/error",
	(req: Request, res: Response, next: express.NextFunction) => {
		throw new Error("Something broke!");
	},
);

otherRoutes.get("/json", (req: Request, res: Response) => {
	res.json(jsonPayload);
});

otherRoutes.get("/jsonp", (req: Request, res: Response) => {
	res.jsonp({ message: "Hello, World!" });
});

otherRoutes.get("/redirect", (req: Request, res: Response) => {
	res.redirect("/new-location");
});

otherRoutes.use("/rand-error", randomErrorMiddleware);
otherRoutes.get("/rand-error", (req: Request, res: Response) => {
	res.status(200).send({ status: 200, message: "=rand-error successful" });
});
