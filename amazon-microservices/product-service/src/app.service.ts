import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject("CACHE_MANAGER") private cacheManager: Cache
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async search(searchName) {

    // TH1: khi API search k dc gọi thường xuyên -> lưu cache
    
    // TH2: nếu search thường xuyên -> k nên lưu cache 

    try {
      if (!searchName) {
        const searchData = this.prisma.products.findMany()
        
        return searchData
      }

      // B1: kiểm tra param searchName có trùng như data trong cache không
      const cacheSearchName = await this.cacheManager.get("SEARCH_NAME") 

      // có thể thay thế bằng mảng (~10 phần tử)
      
      if (cacheSearchName === searchName) {
        const cacheData: any = await this.cacheManager.get("SEARCH_PRODUCT")

        return cacheData
      } else {
        const searchData = this.prisma.products.findMany({
        where: {
          name: {
            contains: searchName
          }
        }
      })

        // B2: set cache
        await this.cacheManager.set("SEARCH_PRODUCT", searchData)

        await this.cacheManager.set("SEARCH_NAME", searchName)

        return searchData
      }

    } catch(err) {
      console.error("500 INTERNAL ERROR!")
    }
  }

  async getAllProducts() {
    try {
      // B1: kiểm tra dữ liệu có trên cache không
      const cacheData = await this.cacheManager.get("GET_ALL_PRODUCTS")

      if (cacheData) {
        return cacheData
      } else {
        const prismaData = this.prisma.products.findMany()

        // B2: set cache
        await this.cacheManager.set("GET_ALL_PRODUCTS", prismaData)

        return prismaData
      }
      
    } catch(err) {
      console.error("500 INTERNAL ERROR!")
    }
  }

  getProductById(product_id) {
    return this.prisma.products.findFirst({
      where: {
        id: Number(product_id)
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

/* NOTE


      //! CÁCH KHẮC PHỤC CACHE
      // C1: chứa dữ liệu chính ở 1 key, và dữ liệu search ở 1 key khác

      // C2: tạo 1 cache mới nếu dữ liệu cũ không khớp

      // Khi thêm 1 sản phẩm mới -> xoá cache cũ và set cache mới

      // if (productData) {
      //   // Filter danh sách sản phẩm tại productData

      //   const resultData = productData.filter((product) => {
      //     if (search_name in product.name) {
      //       return product
      //     }
      //   })

      //   // Kiểm tra độ dài của cacheData và resultData
      //   if (resultData.length == cacheData.length) {
      //     return cacheData
      //   } else {
      //     return resultData
      //   }

*/
