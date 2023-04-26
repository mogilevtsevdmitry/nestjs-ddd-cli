import { join } from 'path';

export const DEFAULT_INDEX = (basePath: string, name: string) => ({
    path: join(basePath, 'index.ts'),
    content: `export * from './${name}-domain.module';
`,
});
