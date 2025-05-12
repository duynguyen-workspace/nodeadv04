import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}

  async create(createProductDto: CreateProductDto) {

    const { name, price, manufacturer } = createProductDto

    await this.prisma.products.create({
      data: {
        name,
        price,
        manufacturer
      }
    })

    return "Create Successfully!!!"
  }

  findAll() {

    return this.prisma.products.findMany();
  }

  findOne(id: number) {

    return this.prisma.products.findMany({
      where: {
        id: id
      }
    });

  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
