import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  courses?: Types.ObjectId[];
}
