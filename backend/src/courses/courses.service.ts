import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { ModelNames } from 'src/helper/model_names';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(ModelNames.COURSES) private courseModel: Model<Course>,
  ) {}

  create(dto: CreateCourseDto) {
    const created = new this.courseModel(dto);
    return created.save();
  }

  findAll(page = 1, limit = 10) {
    return this.courseModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  count() {
    return this.courseModel.countDocuments().exec();
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.courseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async remove(id: string) {
    const res = await this.courseModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Course not found');
  }
}
