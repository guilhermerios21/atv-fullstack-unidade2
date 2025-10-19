import { config } from './config';
import { Request, Response } from 'express';

import express from 'express';
import { json } from 'body-parser';
import connectDB from './config/db';
import routes from './routes/index';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

export default app;

const PORT = config.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({ 

    message: '🚀 Projeto Backend em Express com Autenticação JWT e MongoDB funcionando!',
    status: 'WORKING',
  
  });

});

startServer();
