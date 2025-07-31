import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { ModelNames } from 'src/helper/model_names';

@Injectable()
export class UsersService {
  constructor(@InjectModel(ModelNames.USERS) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const result = await this.userModel.create({ ...dto, password: hash });
    return result;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.aggregate([
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
      {
        $project: {
          password: 0,
        },
      },
    ]);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      await this.userModel.aggregate([
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

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string): Promise<void> {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('User not found');
  }
}
