import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '../entities/basket.entity';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateBasketDto } from './dto/basket.request.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createBasket(dto: CreateBasketDto) {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });
    if (!order) {
      throw new HttpException(`ORDER NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    const basket = new Basket();
    basket.orders = [order];

    const saveBasket = await this.basketRepository.save(basket);
    return saveBasket;
  }
}
