"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const index_1 = __importDefault(require("./routes/index"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
// Middleware
app.use((0, body_parser_1.json)());
// Routes
app.use('/api', index_1.default);
// Error handling middleware
app.use(error_middleware_1.default);
exports.default = app;
