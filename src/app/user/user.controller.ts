import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get-all-users')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('test')
  test70() {
    throw new UnauthorizedException('Invalid credentials');
  }
}
