import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDto } from 'src/role/dto/role.dto';
import { ModelNames } from 'src/helper/model_names';
import { PartnerRole } from './schemas/partner_role.schema';

@Injectable()
export class PartnerRoleService {
  constructor(
    @InjectModel(ModelNames.PARTNER_ROLES)
    private roleModel: Model<PartnerRole>,
  ) {}

  async create(dto: RoleDto) {
    return this.roleModel.create(dto);
  }

  async findAll() {
    return this.roleModel.find().populate('options');
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
