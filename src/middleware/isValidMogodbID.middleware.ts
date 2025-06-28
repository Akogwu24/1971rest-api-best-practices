import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// Middleware to check for a valid MongoDB ObjectId for any field name
/**
 * Middleware to validate a MongoDB ObjectId for a specified field.
 * It checks if the field exists in params, body, or query and validates it.
 *
 * @param field - The name of the field to validate
 * @returns Express middleware function
 */
export function isValidMogodbID(field: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[field] || req.body[field] || req.query[field]; // Dynamically look for the field in params, body, or query

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: true, message: `Invalid ${field}`, data: null });
    }

    next();
  };
}
