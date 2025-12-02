import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
  )
  console.log('🔍 DB_HOST:', process.env.DB_HOST);
  console.log('🔍 DB_PORT:', process.env.DB_PORT);
  console.log('🔍 DB_USERNAME:', process.env.DB_USERNAME);
  console.log('🔍 DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'undefined');
  console.log('🔍 DB_NAME:', process.env.DB_NAME);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
