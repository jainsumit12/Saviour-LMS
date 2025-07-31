import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { InstitutesModule } from './institutes/institutes.module';
import { StudentsModule } from './students/students.module';
import { DesignationsModule } from './designations/designations.module';
import { PartnersModule } from './partners/partners.module';
import { RoleModule } from './role/role.module';
import { StudentSchema } from './students/schemas/student.schema';
import { RoleSchema } from './role/schemas/role.schema';
import { MailerModule } from './mailer/mailer.module';
import { CustomTokenGuard } from './auth/guards/auth.guard';
import { StaffModule } from './staff/staff.module';
import { InstituteRoleModule } from './institute_role/institute_role.module';
import { PartnerRoleModule } from './partner_role/partner_role.module';
import { InstituteStaffModule } from './institute_staff/institute_staff.module';
import { PartnerStaffModule } from './partner_staff/partner_staff.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'students', schema: StudentSchema },
      { name: 'roles', schema: RoleSchema },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://root:!23Hello@144.91.87.151:6565/saviour_lms?authSource=admin&readPreference=primary&ssl=false',
    ),
    UsersModule,
    AuthModule,
    CoursesModule,
    InstitutesModule,
    StudentsModule,
    DesignationsModule,
    RoleModule,
    PartnersModule,
    StaffModule,
    InstituteRoleModule,
    PartnerRoleModule,
    InstituteStaffModule,
    PartnerStaffModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomTokenGuard,
    },
  ],
})
export class AppModule {}
