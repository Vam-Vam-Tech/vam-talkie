import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Vam-Talkie API')
    .setDescription('Api documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(8081);
}
bootstrap();
