import { Controller, Post, Body, UseGuards, Request, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const { username, password, phoneNumber, name } = body;
    return this.authService.register(username, password, phoneNumber, name);
  }

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return { message: 'Access granted', user: req.user };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    // You can handle the user object here, e.g., create a JWT token and send it to the client
    res.redirect(`http://localhost:3000/success?user=${JSON.stringify(user)}`);
  }
}