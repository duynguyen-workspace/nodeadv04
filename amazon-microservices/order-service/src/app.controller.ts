import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
    @Inject('PAYMENT_SERVICE') private payment_service: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('create_order')
  async createOrder(@Payload() payload) {
    try {
      let { product_id, user_id } = payload;

      const orderResult = await this.prisma.orders.create({
        data: {
          product_id,
          user_id,
        },
      });

      // console.log(orderResult);

      if (orderResult) {
        // B3: tạo payment
        const paymentData = await lastValueFrom(
          this.payment_service
            .send('create_payment', {
              order_id: orderResult.order_id,
              ...payload,
            })
            .pipe(
              timeout(5000), // Set thời gian chờ để gọi lại service lần nữa (ms)
              retry(3), // Số lần gọi lại service (khi service bị lỗi)
              catchError((err) => {
                // Trả về lỗi để thông báo cho service biết
                console.error(err);

                return of({ error: 'Service payment is unavailable!!!' });
              }),
            ),
        );

        return {
          status: 201,
          message: 'Created Successfully!',
          data: {
            payment: paymentData,
            order: orderResult,
          },
        };
      }
    } catch (err) {console.error(err)}
  }
}
