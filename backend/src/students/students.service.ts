import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/role/schemas/role.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('students') private studentModel: Model<Student>,
    // @InjectModel('role') private roleModel: Model<Role>,
  ) {}

  async create(dto: CreateStudentDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const created = new this.studentModel({ ...dto, password: hash });
    return created.save();
  }

  findAll() {
    return this.studentModel.find().exec();
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findByEmail(email: string): Promise<Student | null> {
    return (
      await this.studentModel.aggregate([
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

  async update(id: string, dto: UpdateStudentDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const student = await this.studentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async remove(id: string) {
    const res = await this.studentModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Student not found');
  }
}
