import { IsNotEmpty, IsOptional, IsNumber, MinLength } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstituteDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  alternatePhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ minLength: 6 })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  contactPerson?: string;

  @ApiPropertyOptional({ default: 'pending' })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  approvedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  approvedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  established?: number;

  @ApiPropertyOptional()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  totalStudents?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  studentCapacity?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  facultyCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  tagline?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  accreditation?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  specialization?: string[];

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  totalCourses?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  totalEducators?: number;

  @ApiPropertyOptional()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  courses?: string[];
}
