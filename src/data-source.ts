import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-snowy-bread-78264015.eu-central-1.aws.neon.tech',
  port: 5432,
  username: 'evanhays98',
  password: 'Fq17BJVfRtkW',
  database: 'neondb',
  ssl: true,
  entities: ['src/**/*Entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
