import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel('roles') private roleModel: Model<Role>) {}
  async create(createRoleDto: RoleDto) {
    const result = await this.roleModel.create(createRoleDto);
    return result;
  }

  async findAll() {
    const result = await this.roleModel.find().populate('options');
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: RoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
