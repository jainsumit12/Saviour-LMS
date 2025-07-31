import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { InstituteRoleOptionService } from './institute_role_option.service';
import { RoleOptionsDto } from 'src/role/dto/role_options.dto';

@Controller('institute-role-option')
export class InstituteRoleOptionController {
  constructor(private readonly service: InstituteRoleOptionService) {}

  @Post()
  create(@Body() dto: RoleOptionsDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: RoleOptionsDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
