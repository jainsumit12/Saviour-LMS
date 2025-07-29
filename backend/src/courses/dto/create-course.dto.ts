import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


import { Types } from 'mongoose';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  level?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  duration?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  enrollments?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  maxStudents?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  completionRate?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  totalRevenue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  currency?: string;

  @IsOptional()
  duration?: string;

  @IsOptional()
  @IsNumber()
  enrollments?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  maxStudents?: number;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  completionRate?: number;

  @IsOptional()
  @IsNumber()
  totalRevenue?: number;

  @IsOptional()
  language?: string;

  @IsOptional()
  instructor?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  institute?: Types.ObjectId;

  @ApiPropertyOptional()
  @IsOptional()
  status?: string;


  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({ type: [String] })

  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  videoUrl?: string;


  @IsOptional()
  @IsArray()
  requirements?: string[];


  @ApiPropertyOptional({ type: [String] })


  @IsOptional()
  @IsArray()
  objectives?: string[];


  @ApiPropertyOptional({ type: [String] })


  @IsOptional()
  @IsArray()
  prerequisites?: string[];


  @ApiPropertyOptional({ type: Boolean })


  @IsOptional()
  @IsBoolean()
  certificate?: boolean;


  @ApiPropertyOptional({ type: Number })


  @IsOptional()
  @IsNumber()
  credits?: number;


  @ApiPropertyOptional({ type: Boolean })


  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
