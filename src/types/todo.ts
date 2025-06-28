import { TODO_COMPLETION_STATUS_ENUMS, TODO_PRIORITY_ENUMS } from "@/utils/constants";

export type TTodo = {
  title: string;
  description?: string;
  completionStatus: (typeof TODO_COMPLETION_STATUS_ENUMS)[keyof typeof TODO_COMPLETION_STATUS_ENUMS];
  dueDate: Date;
  priority: (typeof TODO_PRIORITY_ENUMS)[keyof typeof TODO_PRIORITY_ENUMS];
};

export type TUpdateTodo = Partial<TTodo> & {
  completionStatus?: (typeof TODO_COMPLETION_STATUS_ENUMS)[keyof typeof TODO_COMPLETION_STATUS_ENUMS];
  priority?: (typeof TODO_PRIORITY_ENUMS)[keyof typeof TODO_PRIORITY_ENUMS];
  dueDate?: Date;
};
