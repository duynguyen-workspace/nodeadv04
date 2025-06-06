import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("create_shipping")
  async createShipping(@Payload() payload) {

    let { order_id, first_name, last_name, street, city, email } = payload

    let shippingData = {
      order_id,
      first_name,
      last_name,
      street,
      city,
      email
    }

    await this.prisma.shipping.create({
      data: shippingData
    })

    return {
      status: 201,
      message: "Created Successfully!",
      data: shippingData
    }
    
  }
}
