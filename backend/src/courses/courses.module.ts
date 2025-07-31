import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: ModelNames.COURSES, schema: CourseSchema },
    ]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
