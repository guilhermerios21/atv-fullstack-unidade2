import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import connectDB from '../src/config/db';
import routes from '../src/routes/index';
import errorMiddleware from '../src/middlewares/error.middleware';

const app = express();

// Middleware
app.use(json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ 
    message: '🚀 Projeto Backend em Express com Autenticação JWT e MongoDB funcionando!',
    status: 'WORKING',
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
