import { Module } from '@nestjs/common';
import { GenerateDomainStructureCommand } from './commands/domain/generate-domain-structure.command';

@Module({
    imports: [],
    providers: [GenerateDomainStructureCommand],
})
export class AppModule {}
