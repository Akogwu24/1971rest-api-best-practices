"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosQuerySchema = exports.getTodoByIdSchema = exports.deleteTodoSchema = exports.updateTodoSchema = exports.createTodoSchema = exports.todoGetAllValidator = exports.getTodoetByIdValidator = exports.deleteTodoValidator = exports.updateTodoValidator = exports.creatTodoValidation = void 0;
const constants_1 = require("../utils/constants");
const express_validator_1 = require("express-validator");
const title = (0, express_validator_1.check)("title", "title is required")
    .trim()
    .exists()
    .withMessage("Title is missing")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string");
const description = (0, express_validator_1.check)("description")
    // .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim();
const completionStatus = (0, express_validator_1.check)("completionStatus")
    // .optional()
    .isIn(Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS))
    .withMessage(`Completion status must be one of: ${Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS)}`);
const dueDate = (0, express_validator_1.check)("dueDate")
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date string")
    .toDate()
    .custom((value) => {
    if (value < new Date()) {
        throw new Error("Due date cannot be in the past");
    }
    return true;
});
const priority = (0, express_validator_1.check)("priority")
    // .optional()
    .isIn(Object.values(constants_1.TODO_PRIORITY_ENUMS))
    .withMessage(`Priority must be one of: ${Object.values(constants_1.TODO_PRIORITY_ENUMS)}`);
const page = (0, express_validator_1.check)("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .default(1);
const limit = (0, express_validator_1.check)("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a positive integer between 1 and 100")
    .default(10);
const sort = (0, express_validator_1.check)("sort")
    .optional()
    .isIn(["title", "dueDate", "priority", "completionStatus"])
    .withMessage("Sort must be one of: title, dueDate, priority, completionStatus")
    .default("dueDate");
const order = (0, express_validator_1.check)("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either 'asc' or 'desc'")
    .default("asc");
const search = (0, express_validator_1.check)("search")
    .optional()
    .isString()
    .withMessage("Search must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Search query must not be empty");
exports.creatTodoValidation = [title, description, completionStatus, dueDate, priority];
exports.updateTodoValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Todo ID"),
    title.optional(),
    description.optional(),
    completionStatus.optional(),
    dueDate.optional(),
    priority.optional(),
];
exports.deleteTodoValidator = [(0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Todo ID")];
exports.getTodoetByIdValidator = [(0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Todo ID")];
exports.todoGetAllValidator = [
    page,
    limit,
    sort,
    order,
    search,
    completionStatus.optional(),
    priority.optional(),
    dueDate.optional(),
];
const zod_1 = require("zod");
// import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from '../utils/constants';
//zod schemas for validation
// --- Reusable Field Schemas ---
const titleSchema = zod_1.z.string({ required_error: "Title is required" }).trim().min(1, "Title is required");
const descriptionSchema = zod_1.z.string({ invalid_type_error: "Description must be a string" }).trim();
const completionStatusSchema = zod_1.z.enum(Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS), {
    errorMap: () => ({
        message: `Completion status must be one of: ${Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS).join(", ")}`,
    }),
});
const dueDateSchema = zod_1.z
    .string()
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
    description: descriptionSchema.optional(),
    completionStatus: completionStatusSchema.optional(),
    dueDate: dueDateSchema.optional(),
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
