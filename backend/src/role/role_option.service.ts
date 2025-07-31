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

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, updateRoleDto: RoleOptionsDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
