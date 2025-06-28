import { Response } from 'express';

/**
 * Reusable success response handler.
 *
 * @param {object} res - Express response object.
 * @param {number} statusCode - Optional status code (default: 200).
 * @param {object|Array|string} data - Response data.
 * @param {string} message - Optional success message (default: 'Success').
 */

type TSucceedResponse = {
  res: Response;
  statusCode?: number;
  data: unknown;
  message?: string;
};

export const successResponse = ({ res, statusCode = 200, data, message = 'Success' }: TSucceedResponse) => {
  res.status(statusCode).json({
    status: 'success',
    success: true,
    error: false,
    message,
    data,
  });
};

//example usage
// successResponseHandler(res, 200, users, 'Users retrieved successfully');
