import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LimitMiddleware } from 'src/middleware/limit/limit.middleware';
import { RoleMiddleware } from 'src/middleware/role/role.middleware';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LimitMiddleware).forRoutes(
      {
        path: '/auth',
        method: RequestMethod.ALL,
      },
      {
        path: '/auth/*',
        method: RequestMethod.ALL,
      },
    );

    consumer.apply(RoleMiddleware).forRoutes('*');
  }
}
