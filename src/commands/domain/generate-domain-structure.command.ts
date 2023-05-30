import { Command, CommandRunner } from 'nest-commander';
import { run } from './scripts';

@Command({
    name: 'domain',
    description: 'Name for the domain structure',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateDomainStructureCommand extends CommandRunner {
    // @Option({
    //     flags: '--orm [string]',
    //     description: 'Type of ORM. Such as Sequilize, TypeORM',
    //     required: false,
    // })
    // parseString(val: string): string {
    //     return val;
    // }

    async run(inputs: string[]): Promise<void> {
        run(inputs);
    }
}
