import { NextFunction, Request, Response } from "express";
import {settingsStore} from "../settings/settings.js";

export const networkDelayMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const delayMS = settingsStore.getSettings().networkDelay;
        console.log('=networkDelayMiddleware - start', delayMS);
        setTimeout(() => {
            console.log('=networkDelayMiddleware - finished', delayMS);
            next();
        }, delayMS);
    };
};