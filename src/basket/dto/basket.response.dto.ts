import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseBasketDto {
  @ApiProperty()
  @IsOptional()
  orderId: number;
}
