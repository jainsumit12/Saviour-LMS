import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './schemas/partner.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PartnersService {
  constructor(@InjectModel(Partner.name) private partnerModel: Model<Partner>) {}

  async create(dto: CreatePartnerDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const created = new this.partnerModel({ ...dto, password: hash });
    return created.save();
  }

  findAll() {
    return this.partnerModel.find().exec();
  }

  async findOne(id: string) {
    const partner = await this.partnerModel.findById(id).exec();
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async update(id: string, dto: UpdatePartnerDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const partner = await this.partnerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async remove(id: string) {
    const res = await this.partnerModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Partner not found');
  }
}
