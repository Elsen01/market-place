import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsInt, IsString } from 'class-validator';
import { ProductOrder } from './product-order.entity';

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

  @ManyToMany(() => ProductOrder, (prodOrder) => prodOrder.products)
  @JoinTable()
  productOrder: ProductOrder[];
}
