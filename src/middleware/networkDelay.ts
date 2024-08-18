import { NextFunction, Request, Response } from "express";

// export const networkDelayMiddleware = (ms?: number) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         setTimeout(() => {
//             next();
//         }, ms);
//     };
// };

export const networkDelayMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('=networkDelayMiddleware - start', 2500);
        setTimeout(() => {
            console.log('=networkDelayMiddleware - finished', 2500);
            next();
        }, 2500);
    };
};