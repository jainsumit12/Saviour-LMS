import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from 'src/common/decorators';
import { IS_PUBLIC_KEY } from 'src/common/decorators';

@Injectable()
export class CustomTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (process.env.NODE_ENV === 'production') {
      return true; // Allow all in production
    }
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt =
      request.cookies?.access_token ||
      request.headers?.authorization?.split(' ')[1] ||
      request.Authorization?.replace('Bearer ', '');

    if (!jwt) {
      throw new UnauthorizedException('Access token missing');
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    try {
      const user = await this.authService.authenticate(jwt);

      if (!user || !user.role) {
        throw new ForbiddenException('User not authenticated or role missing');
      }

      request.user = user;

      if (requiredRoles && !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied');
      }

      return true;
    } catch (err) {
      console.error('Guard error:', err?.message || err);
      throw err instanceof UnauthorizedException ||
        err instanceof ForbiddenException
        ? err
        : new UnauthorizedException('Authentication failed');
    }
  }
}
