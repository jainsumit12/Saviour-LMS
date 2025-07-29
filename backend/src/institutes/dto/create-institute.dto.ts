import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateInstituteDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  logo?: string;

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

  @IsOptional()
  type?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNumber()
  numberOfStudents?: number;

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
