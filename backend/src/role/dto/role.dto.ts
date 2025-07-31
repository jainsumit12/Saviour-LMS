import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RoleDto {
  @ApiProperty({ example: 'Admin', description: 'Name of the role' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;

  @ApiProperty({
    example: ['d2f8a084-e232-4e5e-a2db-7257c7812b7a'],
    description: 'Array of RoleOption IDs to associate with this role',
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}
