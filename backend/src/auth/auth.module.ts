import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentsModule } from 'src/students/students.module';
import { PartnersModule } from 'src/partners/partners.module';
import { InstitutesModule } from 'src/institutes/institutes.module';

@Module({
  imports: [UsersModule, StudentsModule, PartnersModule, InstitutesModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
