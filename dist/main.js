"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./AppModule");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    app
        .use(session({
        secret: 'test secret',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 30 * 60 * 1000,
        },
    }))
        .enableCors();
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map