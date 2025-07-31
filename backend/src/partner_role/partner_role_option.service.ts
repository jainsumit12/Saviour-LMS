import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleOptionsDto } from 'src/role/dto/role_options.dto';
import { ModelNames } from 'src/helper/model_names';
import { PartnerRoleOptions } from './schemas/partner_role_options.schema';

@Injectable()
export class PartnerRoleOptionService {
  constructor(
    @InjectModel(ModelNames.PARTNER_ROLE_OPTIONS)
    private optionModel: Model<PartnerRoleOptions>,
  ) {}

  create(dto: RoleOptionsDto) {
    const created = new this.optionModel(dto);
    return created.save();
  }

  async findAll() {
    return this.optionModel.find().exec();
  }

  async findOne(id: string) {
    return this.optionModel.findById(id).exec();
  }

  async update(id: string, dto: RoleOptionsDto) {
    return this.optionModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return this.optionModel.findByIdAndDelete(id).exec();
  }
}
