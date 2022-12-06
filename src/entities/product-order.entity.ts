import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Order } from './order.entity';

@Entity('product-order')
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity, (product) => product.productOrder)
  products: ProductEntity;

  @ManyToMany(() => Order, (order) => order.proOrder)
  @JoinTable()
  orders: Order[];
}
