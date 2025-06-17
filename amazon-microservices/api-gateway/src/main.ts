import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: 'API Gateway' },
    transports: [
      // new winston.transports.Console(),
      // new winston.transports.File({
      //   filename: 'logs/basic.log', // File lưu trữ log
      //   level: 'error', // Lưu log từ mức info trở lên (info, warn, error)
      // }),

      new winston.transports.Http({
        host: 'localhost', 
        port: 5044,
        level: 'error'
        }),
        new winston.transports.Console(),
      ],

  });

  const app = await NestFactory.create(AppModule, {logger});

  app.enableCors();
  await app.listen(8081);
}
bootstrap();
