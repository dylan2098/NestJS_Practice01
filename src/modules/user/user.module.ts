import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../db/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LimitMiddleware } from 'src/middleware/limit/limit.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, DatabaseService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LimitMiddleware).forRoutes(
      {
        path: '/user/*',
        method: RequestMethod.ALL,
      },
      {
        path: '/user',
        method: RequestMethod.ALL,
      },
    );
  }
}
