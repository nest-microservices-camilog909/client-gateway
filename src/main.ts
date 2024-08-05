import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const logger = new Logger();

  await app.listen(envs.port, () =>
    logger.log('Gateway running on port ' + envs.port),
  );
}
bootstrap();
