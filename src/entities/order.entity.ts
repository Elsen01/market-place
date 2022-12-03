import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { Basket } from './basket.entity';
import { IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

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

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  products: ProductEntity;

  @ManyToMany(() => Basket, (basket) => basket.orders)
  baskets: Basket[];
}
