"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMogodbID = isValidMogodbID;
const mongoose_1 = __importDefault(require("mongoose"));
// Middleware to check for a valid MongoDB ObjectId for any field name
/**
 * Middleware to validate a MongoDB ObjectId for a specified field.
 * It checks if the field exists in params, body, or query and validates it.
 *
 * @param field - The name of the field to validate
 * @returns Express middleware function
 */
function isValidMogodbID(field) {
    return (req, res, next) => {
        const id = req.params[field] || req.body[field] || req.query[field]; // Dynamically look for the field in params, body, or query
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: true, message: `Invalid ${field}`, data: null });
        }
        next();
    };
}
