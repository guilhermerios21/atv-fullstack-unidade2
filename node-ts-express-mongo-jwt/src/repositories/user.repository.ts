import { User, IUser } from '../models/user.model';
import { Model } from 'mongoose';

export class UserRepository {
    private userModel: Model<IUser>;

    constructor() {
        this.userModel = User;
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new this.userModel(userData);
        return await user.save();
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return await this.userModel.findById(userId).exec();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email }).select('+password').exec();
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        return await this.userModel.findByIdAndDelete(userId).exec();
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }
}

export default UserRepository;