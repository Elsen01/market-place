import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from '../entities/basket.entity';
import { Order } from '../entities/order.entity';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, Order])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
