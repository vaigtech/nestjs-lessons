import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';

export class APIException extends BaseException {
  constructor(description: string = 'Bad request') {
    super('BadRequestError', HttpStatus.BAD_REQUEST, description, false);
  }
}
