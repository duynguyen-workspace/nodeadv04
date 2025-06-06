import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), 
  //   CacheModule.register({
  //   isGlobal: true,
  //   ttl: 50000, // time-to-life -> thời gian cache tồn tại (ms)
  //   max: 5, // số lượng "key" mà cache chứa tối đa
  // })
  CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService:ConfigService) => ({
      store: redisStore,
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      auth_pass: configService.get('REDIS_PASSWORD'),
      ttl: configService.get('REDIS_TTL')
    }),
    inject: [ConfigService],
    isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
