import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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
  instructor?: string;

  @IsOptional()
  institute?: string;

  @IsOptional()
  status?: string;
}
