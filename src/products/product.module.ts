import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductOrder } from '../entities/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductOrder])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
