import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ICommandOptions } from './interfaces';
import { run } from './scripts';

@Command({
    name: 'command',
    description: 'Command for domain application',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateCommand extends CommandRunner {
    private readonly logger = new Logger(GenerateCommand.name, { timestamp: false });

    async run(passedParams: string[], options: ICommandOptions): Promise<void> {
        await run(passedParams, options, this.logger);
    }

    @Option({
        flags: '-d, --domain [domain]',
        description: 'Name of domain',
    })
    parseString(val: string): string {
        return val;
    }
}
