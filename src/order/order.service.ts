import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateOrderDto } from './dto/order.request.dto';
import { ProductOrder } from '../entities/product-order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
    }
    const newOrder = new Order();
    newOrder.createdAt = dto.createdAt;
    newOrder.count = dto.count;
    newOrder.price = dto.price;

    const saveOrder = await this.orderRepository.save(newOrder);
    return saveOrder;
  }
}
