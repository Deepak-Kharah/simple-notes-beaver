import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  app.use(cookieParser());

  const corsOptions: CorsOptions = {
    origin: (requestOrigin, callback) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const allowedCorsOrigin = configService.get('security.allowedCorsOrigin');
      if (allowedCorsOrigin === '*' || allowedCorsOrigin === requestOrigin) {
        callback(null, requestOrigin);
      }
    },
    credentials: true,
  };
  app.enableCors(corsOptions);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  await app.listen(configService.get('port'));
}
bootstrap();
