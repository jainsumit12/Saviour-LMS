import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDto } from 'src/role/dto/role.dto';
import { ModelNames } from 'src/helper/model_names';
import { InstituteRole } from './schemas/institute_role.schema';

@Injectable()
export class InstituteRoleService {
  constructor(
    @InjectModel(ModelNames.INSTITUTE_ROLES)
    private roleModel: Model<InstituteRole>,
  ) {}

  async create(dto: RoleDto) {
    const result = await this.roleModel.create(dto);
    return result;
  }

  async findAll() {
    const result = await this.roleModel.find().populate('options');
    return result;
  }

  async findOne(id: string) {
    return this.roleModel.findById(id).populate('options').exec();
  }

  async update(id: string, dto: RoleDto) {
    return this.roleModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}
