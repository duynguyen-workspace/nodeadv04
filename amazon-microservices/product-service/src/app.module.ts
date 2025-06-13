import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ElasticModule } from './elastic/elastic.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), RedisCacheModule, ElasticModule
  //   CacheModule.register({
  //   isGlobal: true,
  //   ttl: 50000, // time-to-life -> thời gian cache tồn tại (ms)
  //   max: 5, // số lượng "key" mà cache chứa tối đa
  // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
