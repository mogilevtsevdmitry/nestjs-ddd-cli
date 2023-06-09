import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    await CommandFactory.run(AppModule, ['error', 'verbose', 'log']);
}
bootstrap();
