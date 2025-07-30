import { Module } from '@nestjs/common';
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
import { RoleModule } from './role/role.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
