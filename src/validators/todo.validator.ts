import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from "@/utils/constants";

import { z } from "zod";

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
