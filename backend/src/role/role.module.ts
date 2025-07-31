import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleOptionService } from './role_option.service';
import { RoleOptionController } from './role_option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { RoleOptionsSchema } from './schemas/role_options.schema';
import { ModelNames } from 'src/helper/model_names';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.ROLES, schema: RoleSchema },
      { name: ModelNames.ROLE_OPTIONS, schema: RoleOptionsSchema },
    ]),
  ],
  controllers: [RoleController, RoleOptionController],
  providers: [RoleService, RoleOptionService],
  exports: [RoleService],
})
export class RoleModule {}
