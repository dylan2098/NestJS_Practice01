import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LimitMiddleware implements NestMiddleware {
  use(req: Request&{limit: number}, res: Response, next: () => void) {
    let isLimit: boolean = true;
    if (!isLimit) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Bad Request',
      });
    }

    req.limit = 2200;

    next();
  }
}
