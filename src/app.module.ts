import { Module } from '@nestjs/common';
import { COMMANDS } from './commands';

@Module({
    providers: [...COMMANDS],
})
export class AppModule {}
