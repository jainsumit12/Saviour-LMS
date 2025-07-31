import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { AccessToken } from 'src/helper/access_token';
import { Role } from 'src/helper/enum';
import { StudentsService } from 'src/students/students.service';
import { PartnersService } from 'src/partners/partners.service';
import { InstitutesService } from 'src/institutes/institutes.service';
const accessToken = new AccessToken();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private studentService: StudentsService,
    private partnerService: PartnersService,
    private instituteService: InstitutesService,
  ) {}

  async validateUser(email: string, pass: string, role: Role) {
    let user;
    if (role === Role.STUDENT) {
      user = await this.studentService.findByEmail(email);
    } else if (role === Role.PARTNER) {
      user = await this.partnerService.findByEmail(email);
    } else if (role === Role.INSTITUTE) {
      user = await this.instituteService.findByEmail(email);
    } else {
      user = await this.usersService.findByEmail(email);
    }
    if (!user) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

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

  async login(email: string, pass: string, role: Role) {
    const user = await this.validateUser(email, pass, role);
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
