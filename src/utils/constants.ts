export const TODO_COMPLETION_STATUS_ENUMS = {
  PENDING: "PENDING",
  ONGOING: "ONGOING",
  DONE: "DONE",
  FAILED: "FIALED",
  CANCELLED: "CANCELLED",
} as const;

export const TODO_PRIORITY_ENUMS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const { MONGODB_URI, PORT = 4040 } = process.env;
