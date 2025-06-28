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
const getAllTodosService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.find();
});
exports.getAllTodosService = getAllTodosService;
const getTodoByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.findById(id);
});
exports.getTodoByIdService = getTodoByIdService;
const createTodoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data", data);
    const newTodo = new todo_model_1.TodoModel(data);
    return yield newTodo.save();
});
exports.createTodoService = createTodoService;
const updateTodoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
});
exports.updateTodoService = updateTodoService;
const deleteTodoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.TodoModel.findByIdAndDelete(id);
});
exports.deleteTodoService = deleteTodoService;
