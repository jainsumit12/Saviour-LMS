import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignationsService } from './designations.service';
import { DesignationsController } from './designations.controller';
import { Designation, DesignationSchema } from './schemas/designation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designation.name, schema: DesignationSchema },
    ]),
  ],
  providers: [DesignationsService],
  controllers: [DesignationsController],
})
export class DesignationsModule {}
