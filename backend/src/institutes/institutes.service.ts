import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './schemas/institute.schema';
import * as bcrypt from 'bcryptjs';
import { ModelNames } from 'src/helper/model_names';
import { MailerService } from 'src/mailer/mailer.service';
import { generateRandomPassword } from 'src/utils/password.util';

@Injectable()
export class InstitutesService {
  constructor(
    @InjectModel(ModelNames.INSTITUTES)
    private instituteModel: Model<Institute>,
    private mailerService: MailerService,
  ) {}

  async create(dto: CreateInstituteDto) {
    const plainPassword = dto.password || generateRandomPassword();
    const hash = await bcrypt.hash(plainPassword, 10);
    const created = new this.instituteModel({ ...dto, password: hash });
    const saved = await created.save();
    await this.mailerService.sendPasswordMail(saved.email, plainPassword);
    return saved;
  }

  findAll() {
    return this.instituteModel.find().exec();
  }

  async findOne(id: string) {
    const institute = await this.instituteModel.findById(id).exec();
    if (!institute) throw new NotFoundException('Institute not found');
    return institute;
  }

  async findByEmail(email: string): Promise<Institute | null> {
    return (
      await this.instituteModel.aggregate([
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

  async update(id: string, dto: UpdateInstituteDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
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
