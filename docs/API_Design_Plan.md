# RESTful API Design and Implementation Plan

This document outlines the detailed plan for designing and implementing a RESTful API following industry best practices, using a todo list example.

## Requirements

1.  Implement proper HTTP methods (GET, POST, PUT, DELETE)
2.  Use appropriate HTTP status codes
3.  Follow RESTful resource naming conventions
4.  Implement proper error handling
5.  Add API documentation using a todo list example
6.  Add a service layer
7.  `completionStatus` can be `PENDING,ONGOING,DONE,FAILED,CANCELLED`,`.
8.  Add `dueDate` field to the todo item.
9.  Add `priority` field to the todo item.
10. Include a logging mechanism for API requests and errors.
11. Add a section on testing strategy.

## Evaluation Criteria

1.  REST principles adherence
2.  API design consistency
3.  Error handling quality
4.  Documentation completeness
5.  Code organization

---

### Detailed Plan for RESTful API Implementation

**1. Project Setup and Dependencies**

- **Action**: Install additional necessary npm packages.
  - `tsx`: For development server with TypeScript.
  - `typescript`, `@types/express`, `@types/node`, `@types/cors`, `@types/mongoose`: For TypeScript development.
  - `custome logger` for logging interactions.
- **Files to modify**: `package.json` (add scripts and dev dependencies).

**2. Database Connection**

- **Action**: Create a dedicated module for MongoDB connection.
- **File**: `src/config/connectDB.ts`
- **Content**:
  - Import `mongoose`.
  - Define an asynchronous function to connect to MongoDB using the URI from environment constants.
  - Handle connection success and error logging.
- **Environment Variable**: `.env` file to store `MONGO_URI` (e.g., `mongodb://localhost:27017/todo_api_db`).

**3. Model Definition**

- **Action**: Define the Mongoose schema for the `Todo` resource.
- **File**: `src/models/todo.model.ts`
- **Content**:
  - Import `mongoose` and `Schema`.
  - Define a schema with:
    - `title` (String, required)
    - `description` (String)
    - `completionStatus` (String, enum: COMPLETION_STATUS_ENUMS, default: 'pending')
    - `dueDate` (Date, optional)
    - `priority` (String, enum: ['low', 'medium', 'high'], default: 'medium')
  - Export the Mongoose model.

**4. Service Layer**

- **Action**: Create a service layer to encapsulate business logic, separating it from controllers.
- **File**: `src/services/todo.service.ts`
- **Content**:
  - Import `todoModel` model.
  - Implement functions for CRUD operations that interact directly with the Mongoose model:
    - `getAllTodos()`: Fetches all todos.
    - `getTodoById(id)`: Fetches a single todo by ID.
    - `createTodo(data)`: Creates a new todo.
    - `updateTodo(id, data)`: Updates an existing todo.
    - `deleteTodo(id)`: Deletes a todo.
  - These functions will handle database interactions and return data or throw specific errors.

**5. API Routes and Controllers**

- **Action**: Implement the controllers to handle requests and responses, delegating business logic to the service layer. Define API endpoints.
- **Files**:
  - `src/controllers/todoController.ts`: Contains functions for each CRUD operation, calling `todoService` methods.
  - `src/routes/todoRoutes.ts`: Defines the API routes and maps them to controller functions.
- **Endpoints to Implement**:
  - `GET /api/v1/todos`: Retrieve all todo items.
    - **Controller**: `getTodos` (calls `todoService.getAllTodos()`)
    - **Status Codes**: 200 OK.
  - `GET /api/v1/todos/:id`: Retrieve a single todo item by ID.
    - **Controller**: `getTodoById` (calls `todoService.getTodoById(id)`)
    - **Status Codes**: 200 OK, 404 Not Found.
  - `POST /api/v1/todos`: Create a new todo item.
    - **Controller**: `createTodo` (calls `todoService.createTodo(data)`)
    - **Logic**: Add input validation for request body.
    - **Status Codes**: 201 Created, 400 Bad Request (for validation errors).
  - `PUT /api/v1/todos/:id`: Update an existing todo item by ID.
    - **Controller**: `updateTodo` (calls `todoService.updateTodo(id, data)`)
    - **Logic**: Add input validation for request body.
    - **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found.
  - `DELETE /api/v1/todos/:id`: Delete a todo item by ID.
    - **Controller**: `deleteTodo` (calls `todoService.deleteTodo(id)`)
    - **Status Codes**: 204 No Content, 404 Not Found.

**6. Error Handling**

- **Action**: Implement a centralized error handling middleware. Integrate logging for errors.
- **File**: `src/middleware/errorHandler.ts`
- **Content**:
  - Define a middleware function that catches errors.
  - Determine appropriate HTTP status codes (e.g., 400 for Mongoose validation errors, 404 for not found, 500 for generic server errors).
  - Log the error details using the logging mechanism.
  - Send consistent JSON error responses (e.g., `{ "message": "Error description" }`).

**7. Logging Mechanism**

- **Action**: Implement a logging utility for API requests and errors.
- **File**: `src/config/logger.ts`
- **Content**:
  - Configure `winston` (or similar) to log to console and potentially a file.
  - Define a request logging middleware to log incoming requests.
- **Integration**:
  - Request logging middleware will be used in `src/app.ts`.
  - Error logging will be integrated into `src/middleware/errorHandler.ts`.

**8. API Documentation**

- **Action**: Create comprehensive API documentation.
- **File**: `docs/API.md`
- **Content**:
  - **Introduction**: Briefly describe the API.
  - **Base URL**: `http://localhost:3000/api/v1` (or configurable).
  - **Endpoints**: For each endpoint (GET, POST, PUT, DELETE for `/todos` and `/todos/:id`):
    - HTTP Method and Path.
    - Description.
    - Request Body (if applicable, with example JSON).
    - Response Body (success and error, with example JSON).
    - HTTP Status Codes.
    - **Update**: Reflect `completionStatus`, `dueDate`, and `priority` fields.
  - **Error Responses**: Standard format for all errors.
  - **Example Usage**: `curl` or `fetch` examples.

**9. Application Setup (`src/app.ts` and `index.ts`)**

- **Action**: Configure the Express application and start the server.
- **Files**: `src/app.ts`, `index.ts`
- **Content (`src/app.ts`)**:
  - Import `express`, `cors`, `todoRoutes`, `errorHandler`, `requestLogger` (from logging middleware).
  - Use `express.json()` for parsing JSON request bodies.
  - Use `cors()` for enabling Cross-Origin Resource Sharing.
  - Use `requestLogger` middleware.
  - Mount `todoRoutes` under the `/api/v1` base path.
  - Register the error handling middleware as the last middleware.
- **Content (`index.ts`)**:
  - Import `app` from `src/app.ts`.
  - Import `connectDB` from `src/config/db.ts`.
  - Load environment variables using `dotenv`.
  - Call `connectDB()` to establish database connection.
  - Define the port (e.g., from environment variables or default 3000).
  - Start the Express server and log a message.

**10. Code Organization**

- **Action**: Maintain a clear and logical directory structure.
- **Structure**:
  ```
  .
  ├── src/
  │   ├── app.ts             // Main Express app setup
  │   ├── config/
  │   │   ├── db.ts          // Database connection
  │   │   └── logger.ts      // Logging configuration
  │   ├── controllers/
  │   │   └── todoController.ts // Request/response handling, delegates to service
  │   ├── middleware/
  │   │   └── errorHandler.ts // Centralized error handling
  │   ├── models/
  │   │   └── Todo.ts        // Mongoose schema for Todo
  │   ├── routes/
  │   │   └── todoRoutes.ts  // API endpoint definitions
  │   └── services/
  │       └── todoService.ts // Business logic for todo operations
  ├── index.ts               // Server entry point
  ├── package.json
  ├── package-lock.json
  ├── .env                   // Environment variables
  └── docs/
      └── API.md             // API documentation
  ```

**11. Testing Strategy**

- **Action**: Outline the testing approach for the API.
- **Content**:
  - **Unit Tests**:
    - **Focus**: Individual components (e.g., `todoService` functions, utility functions, model methods).
    - **Tools**: Jest (or similar).
    - **Mocks**: Mock database interactions (Mongoose models) to test business logic in isolation.
  - **Integration Tests**:
    - **Focus**: API endpoints, ensuring controllers, services, and models work together correctly, including database interactions.
    - **Tools**: Supertest (for HTTP assertions) with Jest.
    - **Approach**: Spin up a test database instance or use an in-memory database for testing. Test all CRUD operations through the API endpoints.
  - **Error Handling Tests**:
    - **Focus**: Verify that the API returns appropriate status codes and error messages for various error scenarios (e.g., invalid input, resource not found, server errors).

### API Flow Diagram (Updated for Service Layer)

```mermaid
graph TD
    A[Client] --> B(Request: HTTP Method + /api/v1/todos);
    B --> C{Express App};
    C --> D[Middleware: Request Logger, JSON Parser, CORS];
    D --> E{Router: todoRoutes};
    E -- GET /todos --> F[Controller: getTodos];
    E -- GET /todos/:id --> G[Controller: getTodoById];
    E -- POST /todos --> H[Controller: createTodo];
    E -- PUT /todos/:id --> I[Controller: updateTodo];
    E -- DELETE /todos/:id --> J[Controller: deleteTodo];

    F --> F1(Service: todoService.getAllTodos());
    G --> G1(Service: todoService.getTodoById());
    H --> H1(Service: todoService.createTodo());
    I --> I1(Service: todoService.updateTodo());
    J --> J1(Service: todoService.deleteTodo());

    F1 --> K(Mongoose Model: Todo.find());
    G1 --> L(Mongoose Model: Todo.findById());
    H1 --> M(Mongoose Model: Todo.create());
    I1 --> N(Mongoose Model: Todo.findByIdAndUpdate());
    J1 --> O(Mongoose Model: Todo.findByIdAndDelete());

    K --> P{Database: MongoDB};
    L --> P;
    M --> P;
    N --> P;
    O --> P;

    P --> Q[Response Data];
    Q --> R{Error Handling Middleware};
    R --> S[Client Response: Status Code + JSON];

    subgraph Server
        C
        D
        E
        F
        G
        H
        I
        J
        F1
        G1
        H1
        I1
        J1
        K
        L
        M
        N
        O
        R
    end
```

6532267d-1594-4894-93af-9e8aec2ed633
aa74e4e8-6e90-42a4-9528-1f4171a2dd6c
