import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  //@ts-ignore
  console.log(configService.get('DATABASE_STRING'));

  //@ts-ignore
  await app.listen(configService.get('port'));
}
bootstrap();
