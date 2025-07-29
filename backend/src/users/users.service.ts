import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const created = new this.userModel({ ...dto, password: hash });
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
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
