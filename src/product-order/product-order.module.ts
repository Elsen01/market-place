import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductOrder } from '../entities/product-order.entity';
import { Order } from '../entities/order.entity';
import { ProductOrderController } from './product-order.controller';
import { ProductOrderService } from './product-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductOrder, Order])],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}
