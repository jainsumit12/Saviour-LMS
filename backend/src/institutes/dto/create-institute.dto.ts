import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ type: Number })

  @IsOptional()
  address?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  website?: string;


  @IsOptional()
  @IsNumber()
  established?: number;


  @ApiPropertyOptional()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ type: Number })

  @IsOptional()
  type?: string;


  @IsOptional()
  @IsNumber()
  rating?: number;


  @ApiPropertyOptional({ type: Number })


  @IsOptional()
  @IsNumber()
  numberOfStudents?: number;


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
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  tagline?: string;

  @IsOptional()
  facebook?: string;

  @IsOptional()
  twitter?: string;

  @IsOptional()
  instagram?: string;


  @IsOptional()
  courses?: string[];
}
