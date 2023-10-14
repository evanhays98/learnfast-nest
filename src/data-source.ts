import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'evandata',
  password: 'evandata',
  database: 'evandata',
  entities: ['src/**/*Entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
