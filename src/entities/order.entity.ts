import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsInt } from 'class-validator';
import { ProductOrder } from './product-order.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column({ default: 0 })
  @IsInt()
  count: number;

  @Column()
  @IsInt()
  price: number;

  @ManyToMany(() => ProductOrder, (prodOrder) => prodOrder.orders)
  proOrder: ProductOrder;
}
