import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { RoleOptions } from './schemas/role_options.schema';
import { RoleOptionsDto } from './dto/role_options.dto';
import { ModelNames } from 'src/helper/model_names';

@Injectable()
export class RoleOptionService {
  constructor(
    @InjectModel(ModelNames.ROLE_OPTIONS)
    private roleOptionModel: Model<RoleOptions>,
  ) {}
  create(dto: RoleOptionsDto) {
    const created = new this.roleOptionModel(dto);
    return created.save();
  }

  async findAll() {
    const result = await this.roleOptionModel.find().exec();
    return result;
  }

  async findOne(id: string) {
    const option = await this.roleOptionModel.findById(id).exec();
    return option;
  }

  async update(id: string, updateRoleDto: RoleOptionsDto) {
    const res = await this.roleOptionModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
      runValidators: true,
    });
    return res;
  }

  async remove(id: string) {
    return this.roleOptionModel.findByIdAndDelete(id).exec();
  }
}
