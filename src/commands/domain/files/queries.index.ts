import { join } from 'path';

export const QUERIES_INDEX = (basePath: string) => ({
    path: join(basePath, 'application-services', 'queries', 'index.ts'),
    content: `import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [];
`,
});
