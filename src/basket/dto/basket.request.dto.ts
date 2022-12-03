import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty()
  @IsOptional()
  orderId: number;
}
