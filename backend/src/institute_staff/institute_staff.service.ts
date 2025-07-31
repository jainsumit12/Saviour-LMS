import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { UpdateStaffDto } from 'src/staff/dto/update-staff.dto';
import { ModelNames } from 'src/helper/model_names';
import { InstituteStaff } from './schemas/institute_staff.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InstituteStaffService {
  constructor(
    @InjectModel(ModelNames.INSTITUTE_STAFFS)
    private staffModel: Model<InstituteStaff>,
  ) {}

  async create(dto: CreateStaffDto, instituteId: string) {
    const alreadyExist = await this.staffModel.findOne({
      email: dto.email,
      institute: instituteId,
    });
    if (alreadyExist) {
      throw new ConflictException('Staff with this email already exists');
    }

    const hash = await bcrypt.hash(dto.password ?? '', 10);
    dto.institute = instituteId;

    const created = new this.staffModel({ ...dto, password: hash });
    return created.save();
  }

  async findAll() {
    return this.staffModel.find().populate('role').populate('institute').exec();
  }

  async findOne(id: string) {
    const staff = await this.staffModel
      .findById(id)
      .populate('role')
      .populate('institute')
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
