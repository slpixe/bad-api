// config/config-api-route.ts
import express, { type Request, type Response } from "express";
import { configStore } from "../store/config.js";

const configApiRouter = express.Router();

export function handleExpressError(res: Response, error: unknown) {
	if (error instanceof Error) {
		res.status(400).json({ message: error.message });
	} else {
		res.status(400).json({ message: "An unknown error occurred" });
	}
}

export function handleError(error: unknown) {
	if (error instanceof Error) {
		console.error("Error:", error.message);
	} else {
		console.error("Error:", error);
	}
}

configApiRouter.get("/", (req: Request, res: Response) => {
	const latestConfig = configStore.getConfig();
	res.status(200).send({ config: latestConfig });
});

configApiRouter.put("/", (req: Request, res: Response) => {
	console.log("=req.body", typeof req.body, req.body);

	const { name, value, config } = req.body;
	console.log("=name, value, config", name, value, config);

	try {
		if (config && Array.isArray(config)) {
			// Update multiple config
			configStore.updateConfig(config);
			res.status(200).json({
				message: "Config updated successfully",
				config: configStore.getConfig(),
			});
		} else if (name && value !== undefined) {
			// Update a single setting
			configStore.updateSetting(name, value);
			res.status(200).json({
				message: `Setting '${name}' updated successfully`,
				config: configStore.getConfig(),
			});
		} else {
			res.status(400).json({
				message:
					"Invalid request. Provide either a single setting or an array of config.",
			});
		}
	} catch (error: unknown) {
		handleExpressError(res, error);
	}
});

export { configApiRouter };
