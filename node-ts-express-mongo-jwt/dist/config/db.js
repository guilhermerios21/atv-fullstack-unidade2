"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.disconnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('MongoDB disconnected successfully');
    }
    catch (error) {
        console.error('MongoDB disconnection failed:', error);
    }
};
exports.disconnectDB = disconnectDB;
exports.default = connectDB;
