import { join } from 'path';

export const DTO_INDEX = (basePath: string) => ({
    path: join(basePath, 'application-services', 'dto', 'index.ts'),
    content: '',
});
