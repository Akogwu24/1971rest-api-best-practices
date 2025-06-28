"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.routeEndpointNotFound = exports.genericErrorHandler = void 0;
const logger_middleware_1 = require("./logger.middleware");
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
const genericErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    (0, logger_middleware_1.logEvents)(`${err.name}: ${err.message}`, "errLog.txt");
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.genericErrorHandler = genericErrorHandler;
const routeEndpointNotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.routeEndpointNotFound = routeEndpointNotFound;
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    //wrong mogodb id error
    if (err.name === "CastError" || err.kind === "ObjectId") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        err = new ErrorHandler(message, 400);
    }
    //wrong jwt token error
    if (err.name === "JsonwebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    //wrong jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.errorMiddleware = errorMiddleware;
