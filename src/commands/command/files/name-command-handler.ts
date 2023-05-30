import { capitalizeName } from '@utils';

export const COMMAND_HANDLER = (name: string) => `import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ${capitalizeName(name)}Command } from './${name}.command';

@CommandHandler(${capitalizeName(name)}Command)
export class ${capitalizeName(name)}CommandHandler implements ICommandHandler<${capitalizeName(name)}Command, void> {
    private readonly logger = new Logger(${capitalizeName(name)}CommandHandler.name);
    constructor() {}

    async execute(command: ${capitalizeName(name)}Command): Promise<void> {
        // your code here
    }
}
`;
