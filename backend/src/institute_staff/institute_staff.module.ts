import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstituteStaffService } from './institute_staff.service';
import { InstituteStaffController } from './institute_staff.controller';
import { InstituteStaffSchema } from './schemas/institute_staff.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.INSTITUTE_STAFFS, schema: InstituteStaffSchema },
    ]),
  ],
  providers: [InstituteStaffService],
  controllers: [InstituteStaffController],
  exports: [InstituteStaffService],
})
export class InstituteStaffModule {}
