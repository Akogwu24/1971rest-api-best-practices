"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGODB_URI = exports.TODO_PRIORITY_ENUMS = exports.TODO_COMPLETION_STATUS_ENUMS = void 0;
exports.TODO_COMPLETION_STATUS_ENUMS = {
    PENDING: "PENDING",
    ONGOING: "ONGOING",
    DONE: "DONE",
    UNDONE: "UNDONE",
    CANCELLED: "cancelled",
};
exports.TODO_PRIORITY_ENUMS = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
};
_a = process.env, exports.MONGODB_URI = _a.MONGODB_URI, exports.PORT = _a.PORT;
