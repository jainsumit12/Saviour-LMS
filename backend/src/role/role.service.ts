import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { RoleDto } from './dto/role.dto';
import { ModelNames } from 'src/helper/model_names';

@Injectable()
export class RoleService {
  constructor(@InjectModel(ModelNames.ROLES) private roleModel: Model<Role>) {}
  async create(createRoleDto: RoleDto) {
    const result = await this.roleModel.create(createRoleDto);
    return result;
  }

  async findAll() {
    const result = await this.roleModel.find().populate('options');
    return result;
  }

  async findByValue(value: string) {
    const result = await this.roleModel.findOne({
      value,
    });
    return result;
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id).populate('options').exec();
    return role;
  }

  async update(id: string, updateRoleDto: RoleDto) {
    const result = await this.roleModel.findByIdAndUpdate(
      { _id: id },
      updateRoleDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  }

  async remove(id: string) {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}
