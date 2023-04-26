import { join } from 'path';

export const COMMANDS_INDEX = (basePath: string) => ({
    path: join(basePath, 'application-services', 'commands', 'index.ts'),
    content: `import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [];
`,
});
