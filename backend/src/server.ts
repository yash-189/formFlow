import { config } from './config';
import { logger } from './shared/utils/logger';
import { connectDatabase } from './shared/database/connection';
import { createApp } from './app';

const startServer = async () => {
    try {
        // Connect to MongoDB
        const db = await connectDatabase(config.MONGODB_URI);

        // Create Express app
        const app = createApp(db);

        // Start server
        app.listen(config.PORT, () => {
            logger.info(`Server running on port ${config.PORT}`);
            logger.info(`Environment: ${config.NODE_ENV}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
