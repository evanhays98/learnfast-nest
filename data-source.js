"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
exports.AppDataSource.initialize()
    .then(function () { })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=data-source.js.map