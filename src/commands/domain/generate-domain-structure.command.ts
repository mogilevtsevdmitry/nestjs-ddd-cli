import { Command, CommandRunner } from 'nest-commander';
import { run } from './scripts';

@Command({
    name: 'domain',
    description: 'Name for the domain structure',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateDomainStructureCommand extends CommandRunner {
    async run(inputs: string[]): Promise<void> {
        run(inputs);
    }
}
