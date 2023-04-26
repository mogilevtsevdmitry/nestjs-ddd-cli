import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_AGGREGATE = (basePath: string, name: string) => ({
    path: join(basePath, 'domain', `${name}.aggregate.ts`),
    content: `import { I${capitalizeName(name)} } from './${name}.interface';
import { ${capitalizeName(name)}DomainServices } from './services/domain.services';

export class ${capitalizeName(name)}Aggregate extends ${capitalizeName(
        name,
    )}DomainServices implements I${capitalizeName(name)} {
    constructor() {
        super();
    }
}
`,
});
