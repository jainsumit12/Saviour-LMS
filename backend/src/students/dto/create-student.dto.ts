import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmergencyContactDto {
  @ApiProperty({ description: 'Name of emergency contact' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Phone number of emergency contact' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dob: string;

  @ApiProperty({ type: EmergencyContactDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergency_contact: EmergencyContactDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  courses?: string[];
}
