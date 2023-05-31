import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { IEventOptions } from './interfaces';
import { run } from './scripts';

@Command({
    name: 'event',
    description: 'Event for domain application',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateEvent extends CommandRunner {
    private readonly logger = new Logger(GenerateEvent.name, { timestamp: false });

    async run(passedParams: string[], options: IEventOptions): Promise<void> {
        await run(passedParams, options, this.logger);
    }

    @Option({
        flags: '-d, --domain [domain]',
        description: 'Name of domain',
        required: true,
    })
    domain(val: string): string {
        return val;
    }

    @Option({
        flags: '-f, --format [format]',
        description: 'Format files by prettier and eslint',
    })
    format(val: string): boolean {
        return JSON.parse(val);
    }
}
