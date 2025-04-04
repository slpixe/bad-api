import express, {
	Express,
	type Request,
	type Response,
	type NextFunction,
} from "express";
import { configStore } from "../store/config.js";

export const randomErrorMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const config = configStore.getConfig();
	const errorChance = config.errorChance; // e.g., 0.5 for 50%

	// Decide whether to return an error based on the configured chance
	if (Math.random() < errorChance) {
		console.log("=randomErrorMiddleware - returning error");
		res.status(500).send("=rand-error Error");
	} else {
		console.log("=randomErrorMiddleware - continuing");
		next();
	}
};
