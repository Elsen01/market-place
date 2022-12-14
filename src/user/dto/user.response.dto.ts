import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  age: number;
}
