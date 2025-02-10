import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request & { role: string }, res: any, next: () => void) {
    req.role = 'Guest';
    next();
  }
}
