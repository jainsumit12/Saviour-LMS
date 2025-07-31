import { Controller, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.role,
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
  @Public()
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
