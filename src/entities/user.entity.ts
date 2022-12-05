import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ default: 15 })
  @IsInt()
  age: number;

  @Column()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;
}
