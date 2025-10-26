import mongoose from 'mongoose';
import { config } from './index';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout após 5 segundos
            socketTimeoutMS: 45000, // Timeout de socket
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    } catch (error) {
        console.error('MongoDB disconnection failed:', error);
    }
};

export { connectDB };
export default connectDB;