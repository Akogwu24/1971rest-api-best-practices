import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from "@/utils/constants";
// import { check, body } from "express-validator";

// // const requestBodyExists = body()
// //   .exists()
// //   .withMessage("Request body cannot be empty")
// //   .notEmpty()
// //   .withMessage("Request body is required");

// const title = body("title", "title is required")
//   .trim()
//   .exists()
//   .withMessage("Title is missing")
//   .notEmpty()
//   .withMessage("Title is required")
//   .isString()
//   .withMessage("Title must be a string");

// const description = body("description")
//   .trim()
//   .exists()
//   .notEmpty()
//   .withMessage("Description is required")
//   .isString()
//   .withMessage("Description must be a string");

// const completionStatus = check("completionStatus")
//   .optional()
//   .isIn(Object.values(TODO_COMPLETION_STATUS_ENUMS))
//   .withMessage(`Completion status must be one of: ${Object.values(TODO_COMPLETION_STATUS_ENUMS)}`);

// const dueDate = check("dueDate")
//   .isISO8601()
//   .withMessage("Due date must be a valid ISO 8601 date string")
//   .toDate()
//   .custom((value) => {
//     if (value < new Date()) {
//       throw new Error("Due date cannot be in the past");
//     }
//     return true;
//   });

// const priority = check("priority")
//   .optional()
//   .isIn(Object.values(TODO_PRIORITY_ENUMS))
//   .withMessage(`Priority must be one of: ${Object.values(TODO_PRIORITY_ENUMS)}`);

// const page = check("page")
//   .optional()
//   .isInt({ min: 1 })
//   .withMessage("Page must be a positive integer")
//   .default(1);

// const limit = check("limit")
//   .optional()
//   .isInt({ min: 1, max: 100 })
//   .withMessage("Limit must be a positive integer between 1 and 100")
//   .default(10);

// const sort = check("sort")
//   .optional()
//   .isIn(["title", "dueDate", "priority", "completionStatus"])
//   .withMessage("Sort must be one of: title, dueDate, priority, completionStatus")
//   .default("dueDate");

// const order = check("order")
//   .optional()
//   .isIn(["asc", "desc"])
//   .withMessage("Order must be either 'asc' or 'desc'")
//   .default("asc");

// const search = check("search")
//   .optional()
//   .isString()
//   .withMessage("Search must be a string")
//   .trim()
//   .isLength({ min: 1 })
//   .withMessage("Search query must not be empty");

// export const creatTodoValidation = [title, description, completionStatus, dueDate, priority];

// export const updateTodoValidator = [
//   check("id").isMongoId().withMessage("Invalid Todo ID"),
//   title.optional(),
//   description.optional(),
//   completionStatus.optional(),
//   dueDate.optional(),
//   priority.optional(),
// ];
// export const deleteTodoValidator = [check("id").isMongoId().withMessage("Invalid Todo ID")];

// export const getTodoetByIdValidator = [check("id").isMongoId().withMessage("Invalid Todo ID")];

// export const todoGetAllValidator = [
//   page,
//   limit,
//   sort,
//   order,
//   search,
//   completionStatus.optional(),
//   priority.optional(),
//   dueDate.optional(),
// ];

import { z } from "zod";
// import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from '@/utils/constants';

//zod schemas for validation

// --- Reusable Field Schemas ---
const titleSchema = z.string({ required_error: "Title is required" }).trim().min(1, "Title is requiredkkk");

const descriptionSchema = z
  .string({ required_error: "Title is required", invalid_type_error: "Description must be a string" })
  .trim()
  .min(3, "Description is too short, must be at least 3 characters")
  .max(500, "Description must not exceed 500 characters");

const completionStatusSchema = z.enum(Object.values(TODO_COMPLETION_STATUS_ENUMS) as [string, ...string[]], {
  errorMap: () => ({
    message: `Completion status must be one of: ${Object.values(TODO_COMPLETION_STATUS_ENUMS).join(", ")}`,
  }),
});

const dueDateSchema = z
  .string({ required_error: "Due Date is required", invalid_type_error: "Must be of type " })
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Due date must be a valid ISO 8601 date string",
  })
  .refine((val) => new Date(val) > new Date(), {
    message: "Due date cannot be in the past",
  });

const prioritySchema = z.enum(Object.values(TODO_PRIORITY_ENUMS) as [string, ...string[]], {
  errorMap: () => ({ message: `Priority must be one of: ${Object.values(TODO_PRIORITY_ENUMS).join(", ")}` }),
});

const pageSchema = z.coerce.number().int().min(1).default(1);
const limitSchema = z.coerce.number().int().min(1).max(100).default(5);
const sortSchema = z.enum(["title", "dueDate", "priority", "completionStatus"]).default("dueDate");
const orderSchema = z.enum(["asc", "desc"]).default("asc");
const searchSchema = z.string().min(1, "Search query must not be empty").optional();

// --- Validators as Zod Schemas ---
export const createTodoSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  // completionStatus: completionStatusSchema.optional(),
  dueDate: dueDateSchema,
  priority: prioritySchema.optional(),
});

export const updateTodoSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  completionStatus: completionStatusSchema.optional(),
  dueDate: dueDateSchema.optional(),
  priority: prioritySchema.optional(),
});

export const deleteTodoSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
});

export const getTodoByIdSchema = deleteTodoSchema;

export const getTodosQuerySchema = z.object({
  page: pageSchema.optional(),
  limit: limitSchema.optional(),
  sort: sortSchema.optional(),
  order: orderSchema.optional(),
  search: searchSchema,
  completionStatus: completionStatusSchema.optional(),
  priority: prioritySchema.optional(),
  dueDate: dueDateSchema.optional(),
});

export type TCreateTodo = z.infer<typeof createTodoSchema>;
export type TUpdateTodo = z.infer<typeof updateTodoSchema>;
export type TDeleteTodo = z.infer<typeof deleteTodoSchema>;
export type TGetTodoById = z.infer<typeof getTodoByIdSchema>;
export type TGetTodosQuery = z.infer<typeof getTodosQuerySchema>;
