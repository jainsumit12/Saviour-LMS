import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerRoleService } from './partner_role.service';
import { PartnerRoleController } from './partner_role.controller';
import { PartnerRoleSchema } from './schemas/partner_role.schema';
import { PartnerRoleOptionsSchema } from './schemas/partner_role_options.schema';
import { PartnerRoleOptionService } from './partner_role_option.service';
import { PartnerRoleOptionController } from './partner_role_option.controller';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.PARTNER_ROLES, schema: PartnerRoleSchema },
      { name: ModelNames.PARTNER_ROLE_OPTIONS, schema: PartnerRoleOptionsSchema },
    ]),
  ],
  controllers: [PartnerRoleController, PartnerRoleOptionController],
  providers: [PartnerRoleService, PartnerRoleOptionService],
  exports: [PartnerRoleService],
})
export class PartnerRoleModule {}
