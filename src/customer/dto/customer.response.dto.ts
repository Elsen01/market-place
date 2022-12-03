import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ResponseCustomerDto {
  @ApiProperty()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  readonly email: string;
}
