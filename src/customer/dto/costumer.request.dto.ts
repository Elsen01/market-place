import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateCostumerDto {
  @ApiProperty()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;
}
