"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsyncErrors = void 0;
//middleware to catch async errors in Express routes
// This allows us to avoid using try-catch blocks in every route handler
// and automatically pass errors to the next middleware (error handler).
const CatchAsyncErrors = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
exports.CatchAsyncErrors = CatchAsyncErrors;
