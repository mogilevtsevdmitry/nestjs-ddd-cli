import { join } from 'path';

export const DOMAIN_INDEX = (basePath: string, name: string) => ({
    path: join(basePath, 'domain', 'index.ts'),
    content: `export * from './${name.toLowerCase()}.aggregate';
export * from './${name.toLowerCase()}.interface';
`,
});
