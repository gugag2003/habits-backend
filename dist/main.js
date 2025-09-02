"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const allowedOrigins = process.env.REACT_APP_PUBLIC_URL
        ? [process.env.REACT_APP_PUBLIC_URL, 'http://localhost:3000']
        : true;
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    const port = process.env.PORT || 3333;
    await app.listen(port, '0.0.0.0');
    console.log(`Server is running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map