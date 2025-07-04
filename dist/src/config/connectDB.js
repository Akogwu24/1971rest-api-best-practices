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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
/**
 * Connect to MongoDB using Mongoose
 * @returns {Promise<void>}
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!constants_1.MONGODB_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        const db = yield mongoose_1.default.connect(constants_1.MONGODB_URI);
        console.log(`MongoDB conneted with ${db.connection.host} 🫕`);
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
