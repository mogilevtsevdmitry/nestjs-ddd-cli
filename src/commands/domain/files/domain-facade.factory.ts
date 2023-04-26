import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_FACADE_FACTORY = (basePath: string, name: string) => ({
    path: join(basePath, 'application-services', 'facade', `${name}-facade.factory.ts`),
    content: `import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { ${capitalizeName(name)}FacadeService } from './${name}-facade.service';

export const ${name}FacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new ${capitalizeName(name)}FacadeService(commandBus, queryBus, eventBus);
`,
});
