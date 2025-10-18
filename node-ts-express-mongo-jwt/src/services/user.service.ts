import UserRepository from '../repositories/user.repository';
import { IUser } from '../models/user.model';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = await this.userRepository.createUser(userData);
        return user;
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user = await this.userRepository.findUserById(userId);
        return user;
    }

    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        const updatedUser = await this.userRepository.updateUser(userId, userData);
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        return await this.userRepository.deleteUser(userId);
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.userRepository.getAllUsers();
        return users;
    }
}

export default UserService;