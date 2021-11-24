import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import configuration from 'config/configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  //@ts-ignore
  await app.listen(configService.get('port'));
}
bootstrap();
