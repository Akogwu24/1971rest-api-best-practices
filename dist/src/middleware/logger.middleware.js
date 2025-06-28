"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logEvents = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const path_1 = __importDefault(require("path"));
const formatDateTime_1 = require("../utils/formatDateTime");
const utils_1 = require("../utils");
/**
 * Logs events to a specified log file with a timestamp and a random code.
 *
 * @param {string} message - The message to log.
 * @param {string} logName - The name of the log file.
 */
const logEvents = (message, logName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = (0, formatDateTime_1.formatDate)({
        date: new Date(),
        options: {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "numeric",
        },
    });
    const logItem = `${dateTime}\t${(0, utils_1.generateRandomAlphaNumericCode)({
        codeLength: 15,
    })}\t${message}\n`;
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "logs"))) {
            yield fs_2.promises.mkdir(path_1.default.join(__dirname, "..", "logs"));
        }
        yield fs_2.promises.appendFile(path_1.default.join(__dirname, "..", "logs", logName), logItem);
    }
    catch (err) {
        console.log(err);
    }
});
exports.logEvents = logEvents;
const logger = (req, res, next) => {
    (0, exports.logEvents)(`${req.method}\torigin-${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.logger = logger;
