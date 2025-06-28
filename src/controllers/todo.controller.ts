import { Request, Response, NextFunction } from "express";
import * as todoService from "../services/todo.service";
import { CatchAsyncErrors } from "@/middleware/catchAsyncErrors";
import { successResponse } from "@/utils/successRespose";
import ErrorHandler from "@/middleware/errorhandler";
import { TCreateTodo } from "@/validators/todo.validator";

/**
 * Controller functions for handling Todo operations.
 * These functions interact with the todoService to perform CRUD operations
 * and return appropriate responses.
 */

// Create a new Todo
export const createTodoController = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, dueDate, priority } = req.body as TCreateTodo;
      const newTodo = await todoService.createTodoService({ title, description, dueDate, priority });
      successResponse({ res, statusCode: 201, message: "Todo created successfully", data: newTodo });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all Todos
export const getTodosController = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await todoService.getAllTodosService();
      successResponse({ res, message: "Todo created successfully", data: todos });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get a Todo by ID
export const getTodoByIdController = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;
      const todo = await todoService.getTodoByIdService(todoId);

      if (!todo) {
        next(new ErrorHandler("Todo not found", 404));
      }

      successResponse({ res, data: todo, message: "Todo found successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update a Todo
export const updateTodoController = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;

      const updatedTodo = await todoService.updateTodoService({ todoId, data: req.body });
      if (!updatedTodo) {
        res.status(404).json({ success: false, message: "Todo not found" });
      }

      successResponse({ res, data: updatedTodo, message: "Todo updated successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete a Todo
export const deleteTodoController = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;

      const deletedTodo = await todoService.deleteTodoService(todoId);
      if (!deletedTodo) {
        next(new ErrorHandler("Todo Not found", 500)); // No content for successful deletion
      }
      successResponse({ res, data: deletedTodo, message: "Todo deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);
