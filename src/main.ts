import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filter/GlobalExceptionFilter';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from './logger/Winston.logger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('title')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /*  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));*/
  //const logger = app.get<Logger>(Logger);
  // app.useLogger(loggerInstance);
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port);
}
bootstrap();
