import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

/**
 * Middleware to validate request body using Zod schema.
 * If validation fails, it sends a 400 response with error details.
 *
 * @param schema - Zod schema to validate the request body against
 * @returns Express middleware function
 */
export const validationMiddleware =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // this throws if invalid
      next();
    } catch (error: any) {
      return res.status(400).json({
        errors: error?.errors?.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  };
