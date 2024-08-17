import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { loggerInstance } from '../logger/Winston.logger'


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    /*
    const controllerName = request['__controllerName'] || 'UnknownController';
    const moduleName = request['module'] || 'UnknownModule';

    console.error('Exception caught by filter:');
    console.error(`Status: ${status}`);
    console.error(`Method: ${request.method}`);
    console.error(`Controller: ${controllerName}`);
    console.error(`Module: ${moduleName}`);
    console.error(`URL: ${request.url}`);
*/
    loggerInstance.error({
      message: exception instanceof Error ? exception.message : 'Unknown error',
      stack: exception instanceof Error ? exception.stack : 'No stack trace',
      method: request.method,
      url: request.url,
      status,
    });
    //this.logger.error('test');

    // console.error('Exception:', exception);
    //console.error('Request:', request);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
