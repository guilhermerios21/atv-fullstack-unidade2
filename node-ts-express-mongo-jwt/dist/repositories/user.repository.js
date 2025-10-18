"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    constructor() {
        this.userModel = user_model_1.User;
    }
    async createUser(userData) {
        const user = new this.userModel(userData);
        return await user.save();
    }
    async findUserById(userId) {
        return await this.userModel.findById(userId).exec();
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email }).select('+password').exec();
    }
    async updateUser(userId, updateData) {
        return await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }
    async deleteUser(userId) {
        return await this.userModel.findByIdAndDelete(userId).exec();
    }
    async getAllUsers() {
        return await this.userModel.find().exec();
    }
}
exports.UserRepository = UserRepository;
exports.default = UserRepository;
