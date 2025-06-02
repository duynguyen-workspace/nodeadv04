import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("get_all_products")
  getAllProducts() {
    return this.appService.getAllProducts()
  }

  @MessagePattern("get_product_by_id")
  getProductById(@Payload() data) {
    let { product_id } = data

    return this.appService.getProductById(product_id)
  }
}
