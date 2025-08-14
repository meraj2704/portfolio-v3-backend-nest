import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      this.logger.error(`JWT Auth Error: ${info?.message || err}`);
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
