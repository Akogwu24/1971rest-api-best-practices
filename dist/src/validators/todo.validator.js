"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosQuerySchema = exports.getTodoByIdSchema = exports.deleteTodoSchema = exports.updateTodoSchema = exports.createTodoSchema = void 0;
const constants_1 = require("../utils/constants");
const zod_1 = require("zod");
//zod schemas for validation
// --- Reusable Field Schemas ---
const titleSchema = zod_1.z.string({ required_error: "Title is required" }).trim().min(1, "Title is requiredkkk");
const descriptionSchema = zod_1.z
    .string({ required_error: "Title is required", invalid_type_error: "Description must be a string" })
    .trim()
    .min(3, "Description is too short, must be at least 3 characters")
    .max(500, "Description must not exceed 500 characters");
const completionStatusSchema = zod_1.z.enum(Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS), {
    errorMap: () => ({
        message: `Completion status must be one of: ${Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS).join(", ")}`,
    }),
});
const dueDateSchema = zod_1.z
    .string({ required_error: "Due Date is required", invalid_type_error: "Must be of type " })
    .refine((val) => !isNaN(Date.parse(val)), {
    message: "Due date must be a valid ISO 8601 date string",
})
    .refine((val) => new Date(val) > new Date(), {
    message: "Due date cannot be in the past",
});
const prioritySchema = zod_1.z.enum(Object.values(constants_1.TODO_PRIORITY_ENUMS), {
    errorMap: () => ({ message: `Priority must be one of: ${Object.values(constants_1.TODO_PRIORITY_ENUMS).join(", ")}` }),
});
const pageSchema = zod_1.z.coerce.number().int().min(1).default(1);
const limitSchema = zod_1.z.coerce.number().int().min(1).max(100).default(5);
const sortSchema = zod_1.z.enum(["title", "dueDate", "priority", "completionStatus"]).default("dueDate");
const orderSchema = zod_1.z.enum(["asc", "desc"]).default("asc");
const searchSchema = zod_1.z.string().min(1, "Search query must not be empty").optional();
// --- Validators as Zod Schemas ---
exports.createTodoSchema = zod_1.z.object({
    title: titleSchema,
    description: descriptionSchema,
    // completionStatus: completionStatusSchema.optional(),
    dueDate: dueDateSchema,
    priority: prioritySchema.optional(),
});
exports.updateTodoSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    completionStatus: completionStatusSchema.optional(),
    dueDate: dueDateSchema.optional(),
    priority: prioritySchema.optional(),
});
exports.deleteTodoSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
});
exports.getTodoByIdSchema = exports.deleteTodoSchema;
exports.getTodosQuerySchema = zod_1.z.object({
    page: pageSchema.optional(),
    limit: limitSchema.optional(),
    sort: sortSchema.optional(),
    order: orderSchema.optional(),
    search: searchSchema,
    completionStatus: completionStatusSchema.optional(),
    priority: prioritySchema.optional(),
    dueDate: dueDateSchema.optional(),
});
