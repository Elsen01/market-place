import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsInt } from 'class-validator';
import { ProductEntity } from './product.entity';

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

  @ManyToMany(() => ProductEntity, (product) => product.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products?: ProductEntity[];
}
