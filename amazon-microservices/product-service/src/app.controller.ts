import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("CACHE_MANAGER") private cacheManager: Cache,
    private elasticService: ElasticsearchService

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

  @MessagePattern("get_elastic_products")
  async getElasticProducts() {
    const data = await this.elasticService.search(
      {
        index: "products",
        query: {
          match: {
            name: 'laptop'
          }
        }
      }
    )

    return data
  }

  @MessagePattern("create_elastic_product")
  async createElasticProduct() {
    // tự thêm id
      return await this.elasticService.create({
        index: "products",
        id: "ma_1",
        document: {
          name: "product ABC",
          price: 180
        }
      })
  }
}
