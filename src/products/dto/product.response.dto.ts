import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseProductDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly price: number;

  @ApiProperty()
  @IsOptional()
  readonly createdAt: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly prodImg: string;
}
