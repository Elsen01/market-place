import { Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Order } from './order.entity';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Order, (order) => order.baskets)
  orders: Order[];
}
