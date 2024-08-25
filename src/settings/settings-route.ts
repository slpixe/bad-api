// settings/settings-route.ts
import express, { type Request, type Response } from "express";
import { settingsStore } from "./settings.js";

const settingsRouter = express.Router();

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

settingsRouter.get("/", (req: Request, res: Response) => {
	const latestSettings = settingsStore.getSettings();
	res.status(200).send({ settings: latestSettings });
});

settingsRouter.put("/", (req: Request, res: Response) => {
	console.log("=req.body", typeof req.body, req.body);

	const { name, value, settings } = req.body;
	console.log("=name, value, settings", name, value, settings);

	try {
		if (settings && Array.isArray(settings)) {
			// Update multiple settings
			settingsStore.updateSettings(settings);
			res.status(200).json({
				message: "Settings updated successfully",
				settings: settingsStore.getSettings(),
			});
		} else if (name && value !== undefined) {
			// Update a single setting
			settingsStore.updateSetting(name, value);
			res.status(200).json({
				message: `Setting '${name}' updated successfully`,
				settings: settingsStore.getSettings(),
			});
		} else {
			res.status(400).json({
				message:
					"Invalid request. Provide either a single setting or an array of settings.",
			});
		}
	} catch (error: unknown) {
		handleExpressError(res, error);
	}
});

export { settingsRouter };
