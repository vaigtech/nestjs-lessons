import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  public readonly name: string;
  public readonly httpCode: HttpStatus;
  public readonly isOperational: boolean;
  public readonly errorCode: number;

  constructor(
    name: string,
    httpCode: HttpStatus,
    description: string,
    isOperational: boolean,
    errorCode: number = 0,
  ) {
    super(description, httpCode);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
  }
}
