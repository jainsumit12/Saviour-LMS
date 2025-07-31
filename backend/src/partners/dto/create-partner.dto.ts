import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ minLength: 6 })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  role?: string;
}
