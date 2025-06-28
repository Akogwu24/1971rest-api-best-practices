"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = ({ res, statusCode = 200, data, message = 'Success' }) => {
    res.status(statusCode).json({
        status: 'success',
        success: true,
        error: false,
        message,
        data,
    });
};
exports.successResponse = successResponse;
//example usage
// successResponseHandler(res, 200, users, 'Users retrieved successfully');
