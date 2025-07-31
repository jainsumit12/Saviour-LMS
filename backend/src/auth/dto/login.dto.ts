import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/helper/enum';


export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;


  @ApiProperty({ enum: Role, example: Role.ADMIN })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

}
