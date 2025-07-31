import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './schemas/partner.schema';
import * as bcrypt from 'bcryptjs';
import { ModelNames } from 'src/helper/model_names';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(ModelNames.PARTNERS) private partnerModel: Model<Partner>,
  ) {}

  async create(dto: CreatePartnerDto) {
    console.log(dto);

    const hash = await bcrypt.hash(dto.password, 10);
    const created = new this.partnerModel({ ...dto, password: hash });
    return created.save();
  }

  findAll() {
    return this.partnerModel.find().exec();
  }

  async findByEmail(email: string): Promise<Partner | null> {
    return (
      await this.partnerModel.aggregate([
        {
          $match: { email },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            pipeline: [
              {
                $lookup: {
                  from: 'roleoptions',
                  localField: 'options',
                  foreignField: '_id',
                  as: 'options',
                },
              },
            ],
            as: 'role',
          },
        },
        {
          $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
    )[0];
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
