import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger.config";
import todoRoutes from "./routes/todo.route";
import { logger } from "./middleware/logger.middleware";
import { corsOptions } from "./config/corsOptions";
import { errorMiddleware, genericErrorHandler, routeEndpointNotFound } from "./middleware/errorhandler";

export const app: Express = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custom logger middleware
app.use(logger);

// Swagger documentation
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Health check route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

//routes
app.use("/api/v1/todo", todoRoutes);

// Error handling middleware
app.use(errorMiddleware);
app.use(routeEndpointNotFound);
app.use(genericErrorHandler);
