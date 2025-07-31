import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './schemas/staff.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(ModelNames.STAFFS) private staffModel: Model<Staff>,
  ) {}

  async create(dto: CreateStaffDto) {
    const hash = await bcrypt.hash(dto.password ?? '', 10);
    const created = new this.staffModel({ ...dto, password: hash });
    return created.save();
  }

  async findAll() {
    return this.staffModel
      .find()
      .populate('role')
      .populate('institute')
      .populate('partner')
      .exec();
  }

  async findOne(id: string) {
    const staff = await this.staffModel
      .findById(id)
      .populate('role')
      .populate('institute')
      .populate('partner')
      .exec();
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async update(id: string, dto: UpdateStaffDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const staff = await this.staffModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async remove(id: string) {
    const res = await this.staffModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Staff not found');
  }
}
