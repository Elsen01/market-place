import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({ format: 'binary', type: 'string' })
  readonly prodImg: string;
}
export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly price: number;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  readonly prodImg: string;
}
