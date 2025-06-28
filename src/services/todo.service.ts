import { TodoModel } from "@/models/todo.model";
import { TTodo } from "@/types/todo";
import { TCreateTodo, TDeleteTodo, TUpdateTodo } from "@/validators/todo.validator";

export const getAllTodosService = async (): Promise<TTodo[]> => {
  return await TodoModel.find();
};

export const getTodoByIdService = async (totId: string): Promise<TTodo | null> => {
  return await TodoModel.findById(totId);
};

export const createTodoService = async (data: TCreateTodo): Promise<TTodo> => {
  const newTodo = new TodoModel(data);
  return await newTodo.save();
};

export const updateTodoService = async ({
  todoId,
  data,
}: {
  todoId: string;
  data: Omit<TUpdateTodo, "id">;
}): Promise<TTodo | null> => {
  return await TodoModel.findByIdAndUpdate(todoId, data, { new: true, runValidators: true });
};

export const deleteTodoService = async (todoId: string): Promise<TTodo | null> => {
  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

  if (!deletedTodo) {
    throw new Error("Todo does not exist");
  }
  return deletedTodo;
};
