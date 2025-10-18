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