import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("ORDER_SERVICE") private order_service: ClientProxy,
    @Inject("NOTIFY_SERVICE") private notify_service: ClientProxy,

  ) {}

  @Get("products")
  getAllProducts() {
    return this.appService.getAllProducts()
  } 

  @Get("products/:id")
  getProduct(@Param("id") product_id) {
    return this.appService.getProductById(product_id)
  } 

  @Post("orders")
  createOrder(@Body() payload) {

    // B1: Gửi mail xác nhận order
    this.notify_service.emit("send_confirm_mail", {})

    // B2: tạo order
    const orderData = this.order_service.send("create_order", payload)

    return orderData
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
