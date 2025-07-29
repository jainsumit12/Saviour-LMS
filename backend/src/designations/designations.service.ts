import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from './schemas/designation.schema';

@Injectable()
export class DesignationsService {
  constructor(
    @InjectModel(Designation.name) private designationModel: Model<Designation>,
  ) {}

  create(dto: CreateDesignationDto) {
    const created = new this.designationModel(dto);
    return created.save();
  }

  findAll() {
    return this.designationModel.find().exec();
  }

  async findOne(id: string) {
    const designation = await this.designationModel.findById(id).exec();
    if (!designation) throw new NotFoundException('Designation not found');
    return designation;
  }

  async update(id: string, dto: UpdateDesignationDto) {
    const designation = await this.designationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!designation) throw new NotFoundException('Designation not found');
    return designation;
  }

  async remove(id: string) {
    const res = await this.designationModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Designation not found');
  }
}
