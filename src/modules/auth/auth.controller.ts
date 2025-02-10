import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {
    console.log('call auth controller');
  }

  @Get()
  authtest(@Req() req: Request & { limit: number; role: string }) {
    console.log('auth limit', req.limit);
    console.log('auth role', req.role)
    return 'auth test page';
  }

  @Get('login')
  login(@Req() req: Request & { limit: number }) {
    console.log('call login', req.limit);
    return {
      auth: true,
    };
  }
}
