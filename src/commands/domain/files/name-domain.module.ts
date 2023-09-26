import { capitalizeName, lowerName } from '@utils';
import { join } from 'path';

export const DOMAIN_MODULE = (basePath: string, name: string) => ({
    path: join(basePath, `${name.toLowerCase()}-domain.module.ts`),
    content: `import { DynamicModule, Module, Type } from '@nestjs/common';
import { CqrsModule, CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS } from './application-services/commands';
import { EVENT_HANDLERS } from './application-services/events';
import { QUERY_HANDLERS } from './application-services/queries';
import { ${capitalizeName(name)}FacadeService, ${lowerName(name)}FacadeFactory } from './application-services/facade';
import { ${capitalizeName(name)}Repository } from './repositories';
import { ${capitalizeName(name)}SagaService } from './sagas/${name.toLowerCase()}-saga.service';

interface ${capitalizeName(name)}ModuleProviders {
    ${lowerName(name)}Providers: Type<${capitalizeName(name)}Repository>;
}

@Module({})
export class ${capitalizeName(name)}DomainModule {
    static register(providers: ${capitalizeName(name)}ModuleProviders): DynamicModule {
        return {
            module: ${capitalizeName(name)}DomainModule,
            imports: [CqrsModule],
            providers: [
                ${capitalizeName(name)}SagaService,
                {
                    provide: ${capitalizeName(name)}FacadeService,
                    inject: [CommandBus, QueryBus, EventBus],
                    useFactory: ${lowerName(name)}FacadeFactory,
                },
                {
                    provide: ${capitalizeName(name)}Repository,
                    useClass: providers.${lowerName(name)}Providers,
                },
                ...COMMAND_HANDLERS,
                ...QUERY_HANDLERS,
                ...EVENT_HANDLERS,
            ],
            exports: [${capitalizeName(name)}FacadeService],
        };
    }
}
`,
});
