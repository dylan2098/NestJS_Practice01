import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testtypeorm',
      entities: [User], // danh sach cac entity anh xa
      synchronize: true, // tu dong tao bang tu entity (for development)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LimitMiddleware).forRoutes(
//       {
//         path: '/user/*',
//         method: RequestMethod.ALL,
//       },
//       {
//         path: '/auth/*',
//         method: RequestMethod.ALL,
//       },
//     );
//   }
// }
export class AppModule {}
