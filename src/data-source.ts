import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  entities: ['src/**/*Entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
