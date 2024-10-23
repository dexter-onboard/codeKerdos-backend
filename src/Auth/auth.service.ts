import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../database/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(username: string, password: string, phoneNumber: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, phoneNumber, name });
    const user = await newUser.save()
    return { message: 'User registered successfully', user };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { message: 'Invalid credentials' };
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload, {secret: process.env.JWT_SECRET});
    return { token };
  }

  async validateUser(username: string, password: string): Promise<any> {
    return this.userModel.findOne({ username, password }).exec();
  }


  async assignCourseToUser(courseId: string, userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if( user.courses) {
      user.courses.push(new Types.ObjectId(courseId));
    } else {
      user.courses = [];
      user.courses.push(new Types.ObjectId(courseId));
    }
    return user.save();
  }

  async getUserCourses(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    return user.courses;
  }

  async getUserInfo(userId: string) {
    return this.userModel.findById(userId).exec();
  }

}

