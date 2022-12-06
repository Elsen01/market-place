import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrder } from '../entities/product-order.entity';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { ProductEntity } from '../entities/product.entity';
import { CreateOrderDto } from '../order/dto/order.request.dto';
import { CreateProductOrder } from './dto/product-order.request.dto';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProductOrder(dto: CreateProductOrder) {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
    }
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });
    if (!order) {
      throw new HttpException(`Order Not Found`, HttpStatus.NOT_FOUND);
    }
    const newProductOrder = new ProductOrder();
    newProductOrder.orders = [order];
    newProductOrder.products = product;

    const saveProductOrder = await this.productOrderRepository.save(
      newProductOrder,
    );
    return saveProductOrder;
  }
}
