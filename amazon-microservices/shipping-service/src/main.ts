import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:1234@localhost:5672'],
      queue: "shipping_queue",
      queueOptions: {
        durable: true // true -> giữ lại queue khi RabbitMQ sập / reset
      },
      persistent: true // true -> giữ lại message trong queue khi RabbitMQ sập / reset
    }
    
  });

  await app.listen();
}

bootstrap();
