import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.push({ username, password: hashedPassword });
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = this.users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { message: 'Invalid credentials' };
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async validateUser(username: string): Promise<any> {
    return this.users.find(user => user.username === username);
  }
}