import { Injectable, Logger } from '@nestjs/common';
import { users } from '../../moks';

@Injectable()
export class UserService {
  constructor(private readonly logger: Logger) {}
  SERVICE: string = UserService.name;

  getUsers() {
    this.logger.log(
      `User created successfully - ${users.length}`,
      this.SERVICE,
    );
    //this.logger.error('Unable to create user', [], this.SERVICE);

    return users;
  }
}
