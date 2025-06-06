import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("CACHE_MANAGER") private cacheManager: Cache
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("set_cache")
  async setCache(@Payload() payload) {
    const { key, value } = payload

    // console.log(payload)

    const data = await this.cacheManager.set(key, value)

    // console.log(data)
  }

  @MessagePattern("get_cache")
  async getCache(@Payload() payload) {
    const { key } = payload

    const data = await this.cacheManager.get(key)

    // console.log(data)

    return data
  }

  @MessagePattern("search_product")
  search(@Payload() payload) {
    const { search_name } = payload

    return this.appService.search(search_name)
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
