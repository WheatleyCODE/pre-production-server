import { TokensService } from './../tokens/tokens.service';
import { ROLES_KEY } from './roles.auth.decorator';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private tokensService: TokensService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authenticated',
        });
      }

      const user = this.tokensService.verifyAccessToken(token);
      req.user = user;
      console.log(user);
      console.log(requiredRoles);

      return user.role === requiredRoles;
    } catch (e) {
      throw new HttpException('Нет прав', HttpStatus.FORBIDDEN);
    }
  }
}
