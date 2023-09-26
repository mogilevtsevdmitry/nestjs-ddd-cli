import { join } from 'path';

export const REPOSITORIES_INDEX = (basePath: string, name: string) => ({
    path: join(basePath, 'repositories', 'index.ts'),
    content: `export * from './${name.toLowerCase()}-repository.abstract';
`,
});
