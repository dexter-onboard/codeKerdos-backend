import { Module } from '@nestjs/common';
import { AuthService } from './Auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from './database/models/user.schema';
import { Course, CourseSchema } from './database/models/course.schema';
import { CourseService } from './Course/course.service';
import { CourseController } from './Course/course.controller';
import { AuthController } from './Auth/auth.controller';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Course.name, schema: CourseSchema}
    ]),
  ],
  providers: [AuthService, JwtService, CourseService],
  controllers: [CourseController, AuthController],
})
export class AppModule {}