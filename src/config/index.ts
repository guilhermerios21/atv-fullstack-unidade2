import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
  // Nome do banco de dados a ser utilizado (evita usar 'admin' por engano em produção)
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'backend-db',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

export default config;