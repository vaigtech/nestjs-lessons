import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser.length !== 0) {
      throw new BadRequestException(AppError.USER_EXISTS);
    }

    return this.userService.createUser(dto);
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser.length == 0) {
      throw new BadRequestException(AppError.USER_NOT_EXISTS);
    }
    const validatePassword: boolean = await bcrypt.compare(
      dto.password,
      existUser[0].password,
    );
    console.log(validatePassword);
    if (!validatePassword) {
      throw new BadRequestException(AppError.WRONG_DATA);
    }
    return existUser[0];
  }
}
