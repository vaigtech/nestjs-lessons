import { Injectable } from '@nestjs/common';
import { users } from '../../moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  getUsers() {
    return users;
  }
  async findUserByEmail(email: string) {
    //return this.userRepository.findOne({ where: { email: email } });
    return this.userRepository.findAll({
      where: {
        email: email,
      },
    });
  }
  async createUser(dto): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create(dto);
    return dto;
  }
  async hashPassword(password) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
