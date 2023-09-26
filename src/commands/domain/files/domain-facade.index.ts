import { join } from 'path';

export const DOMAIN_FACADE_INDEX = (basePath: string, name: string) => ({
    path: join(basePath, 'application-services', 'facade', 'index.ts'),
    content: `export * from './${name.toLowerCase()}-facade.factory';
export * from './${name.toLowerCase()}-facade.service';    
`,
});
