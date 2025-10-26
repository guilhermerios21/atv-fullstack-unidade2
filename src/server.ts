import { config } from './config';
import { Request, Response } from 'express';

import express from 'express';
import { json } from 'body-parser';
import connectDB from './config/db';
import routes from './routes/index';
import errorMiddleware from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

// Middleware
app.use(json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Docs - JWT + Tasks CRUD',
}));

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
            console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({ 

    message: '✅ API de Autenticação JWT v1.0.0 - Sistema operacional!'
  
  });

});

startServer();
