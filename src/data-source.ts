import {DataSource} from "typeorm";
import {UserEntity} from "./auth/entities/UserEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'learnfastnest',
    password: 'learnfastNest',
    database: 'learnfastnest',
    entities: ["src/**/*Entity.ts"],
    subscribers: [],
    migrations: ["src/migrations/*.ts"],


});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error));
