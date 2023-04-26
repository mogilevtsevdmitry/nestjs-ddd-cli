import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_SERVICES = (basePath: string, name: string) => ({
    path: join(basePath, 'domain', 'services', 'domain.services.ts'),
    content: `import { AggregateRoot } from '@nestjs/cqrs';

export class ${capitalizeName(name)}DomainServices extends AggregateRoot {
    constructor() {
        super();
    }
}
`,
});
