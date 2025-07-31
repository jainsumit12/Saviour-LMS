import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { InstituteRoleService } from './institute_role.service';
import { RoleDto } from 'src/role/dto/role.dto';

@Controller('institute-role')
export class InstituteRoleController {
  constructor(private readonly service: InstituteRoleService) {}

  @Post()
  create(@Body() dto: RoleDto) {
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
  update(@Param('id') id: string, @Body() dto: RoleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
