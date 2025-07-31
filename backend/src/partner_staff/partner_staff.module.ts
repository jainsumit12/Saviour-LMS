import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerStaffService } from './partner_staff.service';
import { PartnerStaffController } from './partner_staff.controller';
import { PartnerStaffSchema } from './schemas/partner_staff.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.PARTNER_STAFFS, schema: PartnerStaffSchema },
    ]),
  ],
  providers: [PartnerStaffService],
  controllers: [PartnerStaffController],
  exports: [PartnerStaffService],
})
export class PartnerStaffModule {}
