import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), ClientsModule.register([
    {
      name: "NOTIFY_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@some-rabbit:5672'],
        queue: "notify_queue",
        queueOptions: {
          durable: true
        },
        persistent: true
      }
    },
    {
      name: "SHIPPING_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@some-rabbit:5672'],
        queue: "shipping_queue",
        queueOptions: {
          durable: true
        },
        persistent: true
      }
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
