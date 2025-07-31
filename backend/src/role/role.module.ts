import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleOptionService } from './role_option.service';
import { RoleOptionController } from './role_option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { RoleOptionsSchema } from './schemas/role_options.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'roles', schema: RoleSchema },
      { name: 'roleoptions', schema: RoleOptionsSchema },
    ]),
  ],
  controllers: [RoleController, RoleOptionController],
  providers: [RoleService, RoleOptionService],
})
export class RoleModule {}
