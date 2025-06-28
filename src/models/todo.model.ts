import { TTodo } from "@/types/todo";
import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from "@/utils/constants";
import mongoose, { Schema, Document } from "mongoose";

const TodoSchema: Schema = new Schema<TTodo & Document>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completionStatus: {
      type: String,
      enum: Object.values(TODO_COMPLETION_STATUS_ENUMS),
      default: TODO_COMPLETION_STATUS_ENUMS.PENDING,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TODO_PRIORITY_ENUMS),
      default: TODO_PRIORITY_ENUMS.MEDIUM,
    },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.models.Todo ?? mongoose.model<TTodo>("Todo", TodoSchema);
