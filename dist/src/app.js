"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const logger_middleware_1 = require("./middleware/logger.middleware");
const corsOptions_1 = require("./config/corsOptions");
const errorhandler_1 = require("./middleware/errorhandler");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use((0, cors_1.default)(corsOptions_1.corsOptions));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
//custom logger middleware
exports.app.use(logger_middleware_1.logger);
// Health check route
exports.app.get("/test", (req, res) => {
    res.status(200).json({ message: "API is running" });
});
//routes
exports.app.use("/api/v1/todo", todo_route_1.default);
// Error handling middleware
exports.app.use(errorhandler_1.errorMiddleware);
exports.app.use(errorhandler_1.routeEndpointNotFound);
exports.app.use(errorhandler_1.genericErrorHandler);
