import express, { Express, Request, Response, NextFunction } from "express";

// export const randomTimeout = (req: Request, res: Response, next: NextFunction) => {
//     console.log('=aa');
//     next();
// }

export const randomErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(Math.random() < 0.5) {
        res.status(500).send('=rand-error Error');
    } else {
        next();
    }
};