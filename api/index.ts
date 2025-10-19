import app from '../src/app';
import connectDB from '../src/config/db';
import { Request, Response } from 'express';

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ 
    message: '🚀 Projeto Backend em Express com Autenticação JWT e MongoDB funcionando!',
    status: 'WORKING',
  });
});

// Connect to MongoDB
connectDB().catch(err => {
  console.error('MongoDB connection error:', err);
});

// Export the Express app for Vercel
export default app;
