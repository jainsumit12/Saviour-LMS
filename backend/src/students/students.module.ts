import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentSchema } from './schemas/student.schema';
import { ModelNames } from 'src/helper/model_names';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.STUDENTS, schema: StudentSchema },
    ]),
    RoleModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
