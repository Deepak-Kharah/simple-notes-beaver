import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const corsOptions: CorsOptions = {
    origin: (requestOrigin, callback) => {
      const allowedOrigin: string[] = configService.get(
        //@ts-ignore
        'security.allowedCorsOrigin',
      );
      if (allowedOrigin.includes(requestOrigin)) {
        callback(null, allowedOrigin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.enableCors(corsOptions);

  //@ts-ignore
  await app.listen(configService.get('port'));
}
bootstrap();
