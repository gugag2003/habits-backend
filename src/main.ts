import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria uma instância da aplicação Nest baseada no módulo raiz.
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS:
  // - Permite a origem definida em REACT_APP_PUBLIC_URL (se existir) e localhost:3000.
  // - Caso REACT_APP_PUBLIC_URL não esteja definida, libera todas as origens.
  const allowedOrigins = process.env.REACT_APP_PUBLIC_URL
    ? [process.env.REACT_APP_PUBLIC_URL, 'http://localhost:3000']
    : true;
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Escuta na porta definida pela variável de ambiente PORT (fornecida pelo Railway),
  // com fallback para 3333. Usa '0.0.0.0' para aceitar conexões externas.
  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  console.log(`Server is running on port ${port}`);
}

bootstrap();