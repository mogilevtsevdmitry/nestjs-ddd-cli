import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_FACADE_SERVICE = (basePath: string, name: string) => ({
    path: join(basePath, 'application-services', 'facade', `${name}-facade.service.ts`),
    content: `import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class ${capitalizeName(name)}FacadeService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) {}
}
`,
});
