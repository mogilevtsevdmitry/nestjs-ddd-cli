import { join } from 'path';

export const EVENTS_INDEX = (basePath: string) => ({
    path: join(basePath, 'application-services', 'events', 'index.ts'),
    content: `import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const EVENT_HANDLERS: Type<IEventHandler>[] = [];
`,
});
