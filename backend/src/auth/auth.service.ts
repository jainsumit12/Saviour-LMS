import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { AccessToken } from 'src/helper/access_token';
const accessToken = new AccessToken();
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async authenticate(token: string): Promise<any> {
    // Your JWT verification logic here
    try {
      const decoded = accessToken.decodeAccessToken(token);

      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) throw new UnauthorizedException();
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.generateToken(payload),
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already in use');
    const user = await this.usersService.create(dto);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.generateToken(payload),
    };
  }

  async generateToken(user: any) {
    const payload = {
      id: user.id,
      role: user.role?.name,
    };

    return accessToken.generateAccessToken(payload);
  }
}
