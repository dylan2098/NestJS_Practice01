import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
// default validation pipe
// @UsePipes(new ValidationPipe({ transform: true }))

// custom validation pipe
// @UsePipes(
//   new ValidationPipe({
//     exceptionFactory: (validationErrors: ValidationError[] = []) => {
//       return new BadRequestException(
//         validationErrors.map((error) => ({
//           [error.property]: Object.values(error.constraints ?? {})[0],
//         })),
//       );
//     },
//   }),
// )
export class UserController {
  // demo
  // constructor(
  //   private readonly userService: UserService,
  //   private readonly authService: AuthService,
  // ) {
  //   console.log('call user controller');
  // }
  // @Get('hello')
  // hello() {
  //   return [this.userService.getUsers(), this.authService.login()];
  // }
  // @Get()
  // findAll(@Query() query: { limit: string; offset: string }) {
  //   const qOffset =
  //     query?.offset && typeof query.offset === 'string'
  //       ? Number(query.offset)
  //       : 1;
  //   const qLimit =
  //     query?.limit && typeof query.limit === 'string'
  //       ? Number(query.limit)
  //       : 10;
  //   return this.userService.pagination(qLimit, qOffset);
  // }
  // @Get('category')
  // getCategory(@Query() query: { keyword: string; category: string }) {
  //   return {
  //     keyword: query.keyword,
  //     categories: query.category,
  //   };
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.getUser(Number(id));
  // }
  // @Post()
  // create(@Body() body: { name: string; age: number }) {
  //   return this.userService.createUser(body);
  // }

  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    if (!users || users.length == 0) {
      throw new HttpException('Table empty', HttpStatus.FORBIDDEN);
    }
    return {
      status: 200,
      data: await this.userService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }

    return {
      status: 200,
      data: user,
    };
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const payload: Partial<User> = {
      firstName: body.firstName,
      lastName: body.lastName,
      isActive: true,
    };

    return await this.userService.create(payload);
  }
}
