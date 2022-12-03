import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ProductModule } from './products/product.module';
import { OrderModule } from './order/order.module';
import { BasketModule } from './basket/basket.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ProductModule,
    OrderModule,
    BasketModule,
    CustomerModule,
    AuthModule,
  ],
})
export class AppModule {}
