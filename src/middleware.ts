import express, { Express, Request, Response, NextFunction } from "express";

export const randomTimeout = (req: Request, res: Response, next: NextFunction) => {
    console.log('=aa');
    next();
}