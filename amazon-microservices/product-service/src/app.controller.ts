import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private elasticService: ElasticsearchService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('set_cache')
  async setCache(@Payload() payload) {
    const { key, value } = payload;

    // console.log(payload)

    const data = await this.cacheManager.set(key, value);

    // console.log(data)
  }

  @MessagePattern('get_cache')
  async getCache(@Payload() payload) {
    const { key } = payload;

    const data = await this.cacheManager.get(key);

    // console.log(data)

    return data;
  }

  @MessagePattern('search_product')
  search(@Payload() payload) {
    const { search_name } = payload;

    return this.appService.search(search_name);
  }

  @MessagePattern('get_all_products')
  getAllProducts() {
    return this.appService.getAllProducts();
  }

  @MessagePattern('get_product_by_id')
  getProductById(@Payload() data) {
    let { product_id } = data;

    return this.appService.getProductById(product_id);
  }

  @MessagePattern('get_elastic_products')
  async getElasticProducts() {
    // throw new Error('404 Cannot get elastic product!!!');
    const data = await this.elasticService.search({
      size: 20,
      index: 'demo_products',
      // query: {
      //   match: {
      //     name: 'laptop'
      //   }
      // }
    });

    return data;
  }

  @MessagePattern('create_elastic_product')
  async createElasticProduct() {
    // tự thêm id
    return await this.elasticService.create({
      index: 'demo_products',
      id: '112',
      document: {
        name: 'product ABC',
        price: 180,
      },
    });
  }

  @MessagePattern('create_auto_elastic_product')
  async createAutoElasticProduct() {
    // tự thêm id
    await this.elasticService.index({
      index: 'demo_products',
      document: {
        name: 'product new auto abc',
        price: 100,
      },
      refresh: true, // reload lại elasticsearch
    });

    return await this.elasticService.search({});
  }
}
