import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductOrder {
  @ApiProperty()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  productId: number;
}
