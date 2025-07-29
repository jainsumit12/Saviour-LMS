import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

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

  @IsOptional()
  institute?: Types.ObjectId;

  @IsOptional()
  status?: string;

  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  videoUrl?: string;

  @IsOptional()
  @IsArray()
  requirements?: string[];

  @IsOptional()
  @IsArray()
  objectives?: string[];

  @IsOptional()
  @IsArray()
  prerequisites?: string[];

  @IsOptional()
  @IsBoolean()
  certificate?: boolean;

  @IsOptional()
  @IsNumber()
  credits?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
