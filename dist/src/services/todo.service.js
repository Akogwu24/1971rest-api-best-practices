"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoService = exports.updateTodoService = exports.createTodoService = exports.getTodoByIdService = exports.getAllTodosService = void 0;
const todo_model_1 = require("../models/todo.model");
/**
 * Service layer for Todo operations
 * This layer interacts with the TodoModel to perform CRUD operations
 */
const getAllTodosService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.find();
});
exports.getAllTodosService = getAllTodosService;
const getTodoByIdService = (totId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.findById(totId);
});
exports.getTodoByIdService = getTodoByIdService;
const createTodoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = new todo_model_1.TodoModel(data);
    return yield newTodo.save();
});
exports.createTodoService = createTodoService;
const updateTodoService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ todoId, data, }) {
    return yield todo_model_1.TodoModel.findByIdAndUpdate(todoId, data, { new: true, runValidators: true });
});
exports.updateTodoService = updateTodoService;
const deleteTodoService = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTodo = yield todo_model_1.TodoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
        throw new Error("Todo does not exist");
    }
    return deletedTodo;
});
exports.deleteTodoService = deleteTodoService;
