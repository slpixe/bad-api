import type { NextFunction, Request, Response } from "express";
import { configStore } from "../config/config.js";

export const networkDelayMiddleware = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const delayMS = configStore.getConfig().networkDelay;
		console.log("=networkDelayMiddleware - start", delayMS);
		setTimeout(() => {
			console.log("=networkDelayMiddleware - finished", delayMS);
			next();
		}, delayMS);
	};
};
