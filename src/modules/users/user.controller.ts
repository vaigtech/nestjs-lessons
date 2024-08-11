import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get-all-users')
  getUsers() {
    return this.userService.getUsers();
  }
  @Post('create-user')
  createUser(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
}
