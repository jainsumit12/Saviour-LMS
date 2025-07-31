import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';
import * as bcrypt from 'bcryptjs';
import { ModelNames } from 'src/helper/model_names';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/helper/enum';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(ModelNames.STUDENTS) private studentModel: Model<Student>,
    private roleService: RoleService,
  ) {}

  async create(
    dto: CreateStudentDto,
  ): Promise<{ message: string; data: Partial<Student> }> {
    const hash = await bcrypt.hash(dto.password, 10);

    const alreadyExist = await this.studentModel.findOne({ email: dto.email });
    if (alreadyExist) {
      throw new ConflictException('Student with this email already exists');
    }

    const studentRole = await this.roleService.findByValue(Role.STUDENT);
    if (!studentRole) {
      throw new NotFoundException('Student role not found');
    }

    dto.role = studentRole._id as string;

    const created = new this.studentModel({ ...dto, password: hash });
    const savedStudent = await created.save();

    const { password, ...studentData } = savedStudent.toObject();

    return {
      message: 'Student added successfully',
      data: studentData,
    };
  }

  async findAll(): Promise<{ message: string; data: Partial<Student[]> }> {
    const result = await this.studentModel.find().exec();
    return {
      message: 'Student list fetch successfully',
      data: result,
    };
  }

  async findOne(
    id: string,
  ): Promise<{ message: string; data: Partial<Student> }> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException('Student not found');
    return {
      message: 'Student profile fetch successfully',
      data: student,
    };
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

  async update(
    id: string,
    dto: UpdateStudentDto,
  ): Promise<{ message: string; data: Partial<Student> }> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const student = await this.studentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!student) throw new NotFoundException('Student not found');
    return {
      message: 'Student updated successfully',
      data: student,
    };
  }

  async remove(id: string) {
    const res = await this.studentModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Student not found');
  }
}
