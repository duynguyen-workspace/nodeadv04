import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  getAllProducts() {
    try {
      return this.prisma.products.findMany()
    } catch(err) {
      console.error("500 INTERNAL ERROR!")
    }
  }

  getProductById(product_id) {
    return this.prisma.products.findFirst({
      where: {
        product_id: Number(product_id)
      }
    })
  }


  /*
  B1: yarn prisma init
  B2: chỉnh sửa .env và file schema.prisma, tạo module + service
  B3: yarn prisma db pull
  B4: yarn prisma generate
  */
}
