import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsOptional()
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  readonly count: number;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  productId: number;
}
