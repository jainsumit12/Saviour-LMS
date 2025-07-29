import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './schemas/institute.schema';

@Injectable()
export class InstitutesService {
  constructor(
    @InjectModel(Institute.name) private instituteModel: Model<Institute>,
  ) {}

  create(dto: CreateInstituteDto) {
    const created = new this.instituteModel(dto);
    return created.save();
  }

  findAll() {
    return this.instituteModel.find().exec();
  }

  async findOne(id: string) {
    const institute = await this.instituteModel.findById(id).exec();
    if (!institute) throw new NotFoundException('Institute not found');
    return institute;
  }

  async update(id: string, dto: UpdateInstituteDto) {
    const institute = await this.instituteModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!institute) throw new NotFoundException('Institute not found');
    return institute;
  }

  async remove(id: string) {
    const res = await this.instituteModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Institute not found');
  }
}
