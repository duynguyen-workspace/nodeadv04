import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaClient: PrismaService

  ){}

  async create(payload: any) {
    // 1. Kiểm tra token -> kiểm tra quyền (role_name) ==> phải login mới đc order

    // 2. Lấy dữ liệu ra

    let { product_id, user_id } = payload

    let orderData = {
      product_id,
      user_id,
      created_date: new Date()
    }

    await this.prismaClient.orders.create({ data: orderData })
    

    return 'This action adds a new order';
  }

  async order() {

    // 1. Gửi email xác nhận
    console.log("send confirm email")

    // 2. Tạo order
    console.log("Tạo order")

    // 3. Tạo payment
    console.log("create payment")

    // 4. Tạo shipping
    console.log("create shipping")

    // 5. Gửi email thành hàng
    console.log("send success email")
  }


  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
