import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDatabase = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        logger.info('MongoDB connected successfully');
        return mongoose.connection;
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
