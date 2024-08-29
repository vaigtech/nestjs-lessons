import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';

export class HTTP400Exception extends BaseException {
  constructor(description: string = 'Bad request', errorCode: number = 0) {
    super(
      'BadRequestException',
      HttpStatus.BAD_REQUEST,
      description,
      true,
      errorCode,
    );
  }
}
