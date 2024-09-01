// networkDelayMiddleware.ts
import type { NextFunction, Request, Response } from "express";
import { configStore } from "../store/config.js";

export const networkDelayMiddleware = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const config = configStore.getConfig();
		const delayMS = config.networkDelay;
		const networkDelayChance = config.networkDelayChance; // e.g., 0.5 for 50%

		// Decide whether to apply the delay based on the configured chance
		if (Math.random() < networkDelayChance) {
			console.log("=networkDelayMiddleware - start", delayMS);
			setTimeout(() => {
				console.log("=networkDelayMiddleware - finished", delayMS);
				next();
			}, delayMS);
		} else {
			next();
		}
	};
};
