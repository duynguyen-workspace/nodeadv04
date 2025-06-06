import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject("PRODUCT_SERVICE") private product_service: ClientProxy
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async search(name) {
    const data = await lastValueFrom(this.product_service.send("search_product", {search_name: name}))

    // console.log(data)

    return data
  }

  async setCache(key, value) {
    await this.product_service.emit("set_cache", {key, value})

    return "Set cache successfully!"
  }
  
  async getCache(key) {
    const data = await lastValueFrom(this.product_service.send("get_cache", {key}))

    return data
  }

  async getAllProducts() {
    const data = await lastValueFrom(this.product_service.send("get_all_products", {}))

    // console.log(data)

    return data
  }

  async getProductById(product_id) {
    const data = await lastValueFrom(this.product_service.send("get_product_by_id", {product_id}))

    // console.log(data)

    return data
  }

  
}
