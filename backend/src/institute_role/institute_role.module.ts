import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstituteRoleService } from './institute_role.service';
import { InstituteRoleController } from './institute_role.controller';
import { InstituteRoleSchema } from './schemas/institute_role.schema';
import { InstituteRoleOptionsSchema } from './schemas/institute_role_options.schema';
import { InstituteRoleOptionService } from './institute_role_option.service';
import { InstituteRoleOptionController } from './institute_role_option.controller';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.INSTITUTE_ROLES, schema: InstituteRoleSchema },
      { name: ModelNames.INSTITUTE_ROLE_OPTIONS, schema: InstituteRoleOptionsSchema },
    ]),
  ],
  controllers: [InstituteRoleController, InstituteRoleOptionController],
  providers: [InstituteRoleService, InstituteRoleOptionService],
  exports: [InstituteRoleService],
})
export class InstituteRoleModule {}
