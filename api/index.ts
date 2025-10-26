import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import connectDB from '../src/config/db';
import routes from '../src/routes/index';
import errorMiddleware from '../src/middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/config/swagger';

const app = express();

// Middleware
app.use(json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Docs - JWT + Tasks CRUD',
}));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ 
    message: '✅ API de Autenticação JWT v1.0.0 - Sistema operacional!'
  });
});

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

// Connect to MongoDB (with error handling)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect on cold start
connectToDatabase();

// Export for Vercel
export default app;
