import { Router } from "express";
import * as todoController from "../controllers/todo.controller";
import { validationMiddleware } from "@/middleware/validator.middleware";
import { createTodoSchema } from "@/validators/todo.validator";
import { isValidMogodbID } from "@/middleware/isValidMogodbID.middleware";

const router = Router();

// The routes are prefixed with "/api/v1/todos" in the main app file
router.get("/", todoController.getTodosController);
router.post("/", validationMiddleware(createTodoSchema), todoController.createTodoController);
router.get("/:todoId", isValidMogodbID("todoId"), todoController.getTodoByIdController);
router.put("/:todoId", isValidMogodbID("todoId"), todoController.updateTodoController);
router.delete("/:todoId", isValidMogodbID("todoId"), todoController.deleteTodoController);

export default router;
