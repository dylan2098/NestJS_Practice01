import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  // demo
  // constructor(private readonly db: DatabaseService) {
  //   console.log('call user service');
  // }
  // getUsers() {
  //   const all = this.db.findAll();
  //   return 'user service - ' + all;
  // }
  // getUser(id: number) {
  //   return {
  //     userId: id,
  //   };
  // }
  // createUser(body: { name: string; age: number }) {
  //   return {
  //     statusCode: 201,
  //     data: {
  //       name: body.name,
  //       age: body.age,
  //     },
  //   };
  // }
  // pagination(limit: number, offset: number) {
  //   return {
  //     statusCode: 200,
  //     data: {
  //       limit: limit,
  //       offset: offset,
  //     },
  //   };
  // }

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(body: Partial<User>) {
    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }
}
