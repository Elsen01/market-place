import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseOrderDto {
  @ApiProperty()
  @IsOptional()
  readonly count: number;

  @ApiProperty()
  @IsOptional()
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  readonly createdAt: string;
}
