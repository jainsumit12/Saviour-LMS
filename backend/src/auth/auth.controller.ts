import { Controller, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    const accessToken = await this.authService.generateToken(user);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      domain: isProd ? '.loop.rockymountaintech.co' : undefined,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login Successfully',
      data: user,
    };
  }
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
