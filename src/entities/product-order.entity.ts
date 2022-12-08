import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Order } from './order.entity';

@Entity('product-order')
export class ProductOrder {
  @PrimaryColumn({ name: 'productId' })
  productId: number;

  @PrimaryColumn({ name: 'orderId' })
  orderId: number;

  @ManyToOne(() => ProductEntity, (product) => product.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  products: ProductEntity[];

  @ManyToOne(() => Order, (order) => order.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
  orders: Order[];
}
