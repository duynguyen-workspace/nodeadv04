import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("duy")
@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // decorator: khai báo chức năng, bắt đầu bằng dấu @

  @Get() // -> endpoint: "/"
  getHello(): string {
    return "Hello 1";
  }

  @ApiQuery({name: "Product Name", description: "Nhap vao ten san pham"})
  @ApiParam({name: "Product ID"})
  @ApiParam({name: "Order ID"})
  @Get("demo/:product_id/:order_id")
  getDemo(
    // @Req() req, // Ctrl / Cmd + i
    @Query("name") name, 
    @Query("age") age, 
    @Param("product_id") product_id,
    @Param("order_id") order_id

  ) {
    // request: 2 loại - params, body (json)

    /* Các loại params (parameters): 
    1. query param (query string). VD: localhost:8080/demo?name=abd&age=18
    2. route param. VD: localhost:8080/demo/products/1 (:id)
    */

    // const { name, age } = req.query

    // const { product_id, order_id } = req.params

    return { name, age, product_id, order_id }
  }

  @Post("demo-body")
  getDemoBody(
    // @Req() req
    @Body() body
  ) {
    return {
      message: "Success",
      statusCode: 201,
      data: body
    }
  }

  // method: RESTFUL, GRAPHQL
  // RESTFUL API: GET (read), POST (create), PUT (update), DELETE (delete)

  
}

  