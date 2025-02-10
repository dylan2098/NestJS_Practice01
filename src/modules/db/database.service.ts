import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor() {
    console.log('call database service');
  }
  findAll() {
    return 'database service';
  }
}
