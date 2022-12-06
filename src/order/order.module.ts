import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductOrder } from '../entities/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ProductEntity, ProductOrder])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
