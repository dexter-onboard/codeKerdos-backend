import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../database/models/course.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}