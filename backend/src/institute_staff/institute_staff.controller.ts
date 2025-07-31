import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InstituteStaffService } from './institute_staff.service';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { UpdateStaffDto } from 'src/staff/dto/update-staff.dto';
import { CurrentUser, Roles } from 'src/decorators';

@ApiTags('institute-staff')
@Roles('institute')
@Controller('institute-staff')
export class InstituteStaffController {
  constructor(private readonly staffService: InstituteStaffService) {}

  @Post()
  create(
    @Body() dto: CreateStaffDto,
    @CurrentUser('token_data') token_data: any,
  ) {
    const instituteId = token_data._id;
    return this.staffService.create(dto, instituteId);
  }

  @Get()
  findAll(@CurrentUser('token_data') token_data: any) {
    console.log(token_data);

    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
