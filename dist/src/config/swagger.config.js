"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "A simple Todo API with best practices",
        },
        servers: [
            {
                url: "/api/v1",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                Todo: {
                    type: "object",
                    required: ["title", "dueDate"],
                    properties: {
                        _id: {
                            type: "string",
                            description: "The auto-generated ID of the todo",
                        },
                        title: {
                            type: "string",
                            description: "The title of the todo",
                        },
                        description: {
                            type: "string",
                            description: "The description of the todo",
                        },
                        completionStatus: {
                            type: "string",
                            enum: Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS),
                            default: constants_1.TODO_COMPLETION_STATUS_ENUMS.PENDING,
                            description: "The completion status of the todo",
                        },
                        dueDate: {
                            type: "string",
                            format: "date",
                            description: "The due date of the todo",
                        },
                        priority: {
                            type: "string",
                            enum: Object.values(constants_1.TODO_PRIORITY_ENUMS),
                            default: constants_1.TODO_PRIORITY_ENUMS.MEDIUM,
                            description: "The priority of the todo",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date and time the todo was created",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date and time the todo was last updated",
                        },
                    },
                },
                CreateTodo: {
                    type: "object",
                    required: ["title", "dueDate"],
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the todo",
                        },
                        description: {
                            type: "string",
                            description: "The description of the todo",
                        },
                        dueDate: {
                            type: "string",
                            format: "date",
                            description: "The due date of the todo",
                        },
                        priority: {
                            type: "string",
                            enum: Object.values(constants_1.TODO_PRIORITY_ENUMS),
                            default: constants_1.TODO_PRIORITY_ENUMS.MEDIUM,
                            description: "The priority of the todo",
                        },
                    },
                },
                UpdateTodo: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the todo",
                        },
                        description: {
                            type: "string",
                            description: "The description of the todo",
                        },
                        completionStatus: {
                            type: "string",
                            enum: Object.values(constants_1.TODO_COMPLETION_STATUS_ENUMS),
                            description: "The completion status of the todo",
                        },
                        dueDate: {
                            type: "string",
                            format: "date",
                            description: "The due date of the todo",
                        },
                        priority: {
                            type: "string",
                            enum: Object.values(constants_1.TODO_PRIORITY_ENUMS),
                            description: "The priority of the todo",
                        },
                    },
                },
            },
        },
        paths: {
            "/todos": {
                get: {
                    summary: "Get all todos",
                    tags: ["Todos"],
                    responses: {
                        200: {
                            description: "A list of todos",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Todo",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    summary: "Create a new todo",
                    tags: ["Todos"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateTodo",
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Todo created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo",
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Invalid input",
                        },
                    },
                },
            },
            "/todos/{todoId}": {
                get: {
                    summary: "Get a todo by ID",
                    tags: ["Todos"],
                    parameters: [
                        {
                            in: "path",
                            name: "todoId",
                            required: true,
                            schema: {
                                type: "string",
                            },
                            description: "ID of the todo to retrieve",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Todo found successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Todo not found",
                        },
                    },
                },
                put: {
                    summary: "Update a todo by ID",
                    tags: ["Todos"],
                    parameters: [
                        {
                            in: "path",
                            name: "todoId",
                            required: true,
                            schema: {
                                type: "string",
                            },
                            description: "ID of the todo to update",
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UpdateTodo",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Todo updated successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo",
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Invalid input",
                        },
                        404: {
                            description: "Todo not found",
                        },
                    },
                },
                delete: {
                    summary: "Delete a todo by ID",
                    tags: ["Todos"],
                    parameters: [
                        {
                            in: "path",
                            name: "todoId",
                            required: true,
                            schema: {
                                type: "string",
                            },
                            description: "ID of the todo to delete",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Todo deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Todo not found",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"], // Path to the API routes
};
exports.default = swaggerOptions;
