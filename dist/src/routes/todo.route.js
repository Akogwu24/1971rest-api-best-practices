"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController = __importStar(require("../controllers/todo.controller"));
const validator_middleware_1 = require("../middleware/validator.middleware");
const todo_validator_1 = require("../validators/todo.validator");
const isValidMogodbID_middleware_1 = require("../middleware/isValidMogodbID.middleware");
const router = (0, express_1.Router)();
// The routes are prefixed with "/api/v1/todos" in the main app file
router.get("/", todoController.getTodosController);
router.post("/", (0, validator_middleware_1.validationMiddleware)(todo_validator_1.createTodoSchema), todoController.createTodoController);
router.get("/:todoId", (0, isValidMogodbID_middleware_1.isValidMogodbID)("todoId"), todoController.getTodoByIdController);
router.put("/:todoId", (0, isValidMogodbID_middleware_1.isValidMogodbID)("todoId"), todoController.updateTodoController);
router.delete("/:todoId", (0, isValidMogodbID_middleware_1.isValidMogodbID)("todoId"), todoController.deleteTodoController);
exports.default = router;
