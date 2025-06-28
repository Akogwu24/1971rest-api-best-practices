"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./src/app");
const constants_1 = require("./src/utils/constants");
const connectDB_1 = require("./src/config/connectDB");
(0, connectDB_1.connectDB)();
mongoose_1.default.connection.once("open", () => {
    console.log("connected to mongoDB ✅");
    app_1.app.listen(constants_1.PORT, () => console.log(`server running on port ${constants_1.PORT} 🚀`));
});
