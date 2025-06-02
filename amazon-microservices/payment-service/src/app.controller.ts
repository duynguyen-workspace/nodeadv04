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
    @Inject("SHIPPING_SERVICE") private shipping_service: ClientProxy,
    @Inject("NOTIFY_SERVICE") private notify_service: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("create_payment")
  async createPayment(@Payload() payload) {

    let { order_id, amount } = payload

    let paymentData = {
      order_id,
      method: "",
      status: "",
      amount,
      payment_date: new Date()
    }

    await this.prisma.payment.create({
      data: paymentData
    })

    // B4: tạo shipping
    const shippingData = await lastValueFrom(this.shipping_service.send("create_order", payload))

    // B5: Gửi mail đặt hàng thành công
    this.notify_service.emit("send_success_mail", {})

    return {
      status: 201,
      message: "Created Successfully!",
      data: {
        payment: paymentData,
        shippingData: shippingData
      }
    }
    
  }

}
