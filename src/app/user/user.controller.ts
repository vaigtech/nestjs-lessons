import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get-all-users')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('test')
  test() {
    throw new UnauthorizedException('Invalid credentials');
  }
  @Get('test1')
  test1() {
    throw new NotFoundException('dd777');
  }
  @Get('test2')
  test2() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  @Get('test3')
  test3() {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }
  @Get('test4')
  test4() {
    throw new HttpVersionNotSupportedException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }
}
