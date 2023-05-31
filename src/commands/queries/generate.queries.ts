import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { IQueryOptions } from './interfaces';
import { run } from './scripts';

@Command({
    name: 'query',
    description: 'Query for domain application',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateQuery extends CommandRunner {
    private readonly logger = new Logger(GenerateQuery.name, { timestamp: false });

    async run(passedParams: string[], options: IQueryOptions): Promise<void> {
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
