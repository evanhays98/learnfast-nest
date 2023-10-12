"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'learnfastnest',
    password: 'learnfastNest',
    database: 'learnfastnest',
    synchronize: true,
    logging: false,
    entities: ['src/**/*.entity.{ts}'],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map