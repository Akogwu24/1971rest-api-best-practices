import { NextFunction, Request, Response } from "express";

//middleware to catch async errors in Express routes
// This allows us to avoid using try-catch blocks in every route handler
// and automatically pass errors to the next middleware (error handler).
export const CatchAsyncErrors =
  (theFunc: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
