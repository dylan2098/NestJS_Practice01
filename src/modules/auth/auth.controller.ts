import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {
    console.log('call auth controller');
  }

  @Get('login')
  login() {
    console.log('call login');
    return {
      auth: true,
    };
  }
}
