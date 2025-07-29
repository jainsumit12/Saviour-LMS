import { IsNotEmpty } from 'class-validator';

export class CreateDesignationDto {
  @IsNotEmpty()
  title: string;
}
