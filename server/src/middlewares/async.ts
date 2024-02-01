import { NextFunction, Request, Response } from "express";
import 'express-async-handler';

const asyncWrapper = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next) 
        } catch (error) {
            next(error)
        }
    }
}

export default asyncWrapper