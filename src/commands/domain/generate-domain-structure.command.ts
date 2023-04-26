import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import { Command, CommandRunner, Option } from 'nest-commander';
import { join } from 'path';
import { defaultFiles } from './files/default';
import { defaultStructures } from './folders/default';

interface DomainOptions {
    name: string;
}

@Command({
    name: 'ddd-cli',
    description: 'Name for the domain structure',
    arguments: '<name>',
    options: { isDefault: true },
})
export class GenerateDomainStructureCommand extends CommandRunner {
    private readonly logger = new Logger(GenerateDomainStructureCommand.name);

    @Option({
        flags: '--orm [string]',
        description: 'Type of ORM. Such as Sequilize, TypeORM',
        required: false,
    })
    parseString(val: string): string {
        return val;
    }

    async run(inputs: string[], options: DomainOptions): Promise<void> {
        const [name] = inputs;

        if (!name) {
            console.error('Error: Please provide a name using --name option');
            process.exit(1);
        }

        const basePath = join('libs', 'domains', 'src', `${name}-domain`);

        // Create the required directories
        const directories = defaultStructures(basePath);
        directories.forEach((dir) => fs.ensureDirSync(dir));

        // Create the required files
        const files = defaultFiles(basePath, name);
        files.forEach((file) => {
            fs.ensureFileSync(file.path);
            if (file.content) {
                files.filter((file) => file.content).forEach((file) => fs.writeFileSync(file.path, file.content));
            }
        });

        this.logger.verbose(`Domain structure for ${name} has been generated successfully.`);
    }
}
