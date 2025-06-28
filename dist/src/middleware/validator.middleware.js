"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const validationMiddleware = (req, res, next) => {
    let errors = (0, express_validator_1.validationResult)(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
        return res.status(406).json({
            message: "Not acceptable",
            error: errors.array(),
        });
    }
    next();
};
exports.validationMiddleware = validationMiddleware;
const validate = (schema) => (req, res, next) => {
    var _a;
    try {
        console.log(req.body);
        req.body = schema.parse(req.body); // this throws if invalid
        next();
    }
    catch (error) {
        console.log("zod error", error);
        return res.status(400).json({
            errors: (_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
    }
};
exports.validate = validate;
