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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
    CoursesModule,
    InstitutesModule,
    StudentsModule,
    DesignationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
