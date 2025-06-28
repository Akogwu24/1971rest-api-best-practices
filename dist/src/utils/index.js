"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationInformation = exports.generateRandomAlphaNumericCode = void 0;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateRandomAlphaNumericCode = ({ codeLength = 4 }) => {
    let result = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
exports.generateRandomAlphaNumericCode = generateRandomAlphaNumericCode;
const paginationInformation = ({ page, totalDocuments, limit, totalPages }) => {
    return {
        currentPage: page,
        totalPages,
        totalItems: totalDocuments,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
    };
};
exports.paginationInformation = paginationInformation;
