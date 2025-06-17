import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from "winston"

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: 'Product Service' },
    transports: [
      new winston.transports.Http({
        host: 'localhost', 
        port: 5044,
        level: 'error'
        }),
        new winston.transports.Console(),
      ],

  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger: logger,
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:1234@localhost:5672'],
      queue: "product_queue",
      queueOptions: {
        durable: true // true -> giữ lại queue khi RabbitMQ sập / reset
      },
      persistent: true // true -> giữ lại message trong queue khi RabbitMQ sập / reset
    }
    
  });
  await app.listen();
}

bootstrap();
