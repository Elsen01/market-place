import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsInt, IsString } from 'class-validator';
import { Order } from './order.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ default: 0 })
  @IsInt()
  price: number;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsString()
  prodImg: string;

  @ManyToMany(() => Order, (order) => order.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'product-order',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
  })
  orders?: Order[];
}
