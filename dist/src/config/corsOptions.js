"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
// const ALLOWED_ORIGINS = ['"http://localhost:4040", "http://localhost:8080"'];
const ALLOWED_ORIGINS = ["*"];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
