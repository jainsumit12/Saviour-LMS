import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RoleOptionsDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  name: string;
}
