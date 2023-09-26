import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_REPOSITORY = (basePath: string, name: string) => ({
    path: join(basePath, 'repositories', `${name.toLowerCase()}-repository.abstract.ts`),
    content: `// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { I${capitalizeName(name)} } from '../domain';

export abstract class ${capitalizeName(name)}Repository {}
`,
});
