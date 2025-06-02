import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
    @Inject("PAYMENT_SERVICE") private payment_service: ClientProxy,
  ){}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("create_order")
  async createOrder(@Payload() payload) {

    let { product_id, user_id } = payload

    let orderData = {
      product_id,
      user_id,
      created_date: new Date()
    }

    await this.prisma.orders.create({
      data: {
        product_id, 
        user_id
      }
    })

    // B3: tạo payment
    const paymentData = await lastValueFrom(this.payment_service.send("create_payment", payload))

    return {
      status: 201,
      message: "Created Successfully!",
      data: {
        payment: paymentData,
        order: orderData
      }
    }

  }

}
