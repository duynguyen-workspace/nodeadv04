import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, pipe, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("ORDER_SERVICE") private order_service: ClientProxy,
    @Inject("NOTIFY_SERVICE") private notify_service: ClientProxy,
    @Inject("PRODUCT_SERVICE") private product_service: ClientProxy,
  ) {}

  @Get("products/search-product")
  search(@Query("name") name) {
    return this.appService.search(name)
  }

  @Get("products")
  getAllProducts() {
    return this.appService.getAllProducts()
  } 

  @Get("products/:id")
  getProduct(@Param("id") product_id) {
    return this.appService.getProductById(product_id)
  } 

  @Get("set-cache")
  setCache(
    @Query("key") key,
    @Query("value") value
  ) {
    return this.appService.setCache(key, value)
  }

  @Get("get-cache")
  getCache(
    @Query("key") key
  ) {
    return this.appService.getCache(key)
  }

  @Post("order")
  async createOrder(@Body() payload) {
    // B1: Gửi mail xác nhận order
    this.notify_service.emit("send_confirm_mail", {})

    // B2: tạo order
    const orderData = await lastValueFrom(this.order_service.send("create_order", payload))

    return orderData
  }

  @Get("/elastic/products")
  async getElasticProducts() {
    const data = await lastValueFrom(this.product_service.send("get_elastic_products", {}))

    return data
  }

  @Post("/elastic/products")
  async createElasticProducts() {
    const data = await lastValueFrom(this.product_service.send("create_elastic_product", {}))

    return data
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }




}
