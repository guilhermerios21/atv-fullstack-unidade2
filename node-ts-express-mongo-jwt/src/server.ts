import app from './app';
import connectDB from './config/db';
import { config } from './config';
import { Request, Response } from 'express';

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