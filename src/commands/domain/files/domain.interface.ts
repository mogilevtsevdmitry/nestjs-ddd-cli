import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_INTERFACE = (basePath: string, name: string) => ({
    path: join(basePath, 'domain', `${name.toLowerCase()}.interface.ts`),
    content: `// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface I${capitalizeName(name)} {}
`,
});
