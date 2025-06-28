"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
/**
 * Middleware to validate request body using Zod schema.
 * If validation fails, it sends a 400 response with error details.
 *
 * @param schema - Zod schema to validate the request body against
 * @returns Express middleware function
 */
const validationMiddleware = (schema) => (req, res, next) => {
    var _a;
    try {
        req.body = schema.parse(req.body); // this throws if invalid
        next();
    }
    catch (error) {
        return res.status(400).json({
            errors: (_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
    }
};
exports.validationMiddleware = validationMiddleware;
