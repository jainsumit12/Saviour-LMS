import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PartnerRoleService } from './partner_role.service';
import { RoleDto } from 'src/role/dto/role.dto';

@Controller('partner-role')
export class PartnerRoleController {
  constructor(private readonly service: PartnerRoleService) {}

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
