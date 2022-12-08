import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductOrder } from '../entities/product-order.entity';
import { Order } from '../entities/order.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductOrder } from './dto/product-order.request.dto';

export class ProductOrderService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createProductOrder(dto: CreateProductOrder) {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(`PRODUCT NOT FOUND`);
    }
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order Not Found`);
    }

    const newProductOrder = new ProductOrder();
    newProductOrder.products = [product];
    newProductOrder.orders = [order];

    const saveProductOrder = await this.productOrderRepository.save(
      newProductOrder,
    );
    console.log(saveProductOrder);
    return saveProductOrder;
  }
}
