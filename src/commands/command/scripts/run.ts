import { Logger } from '@nestjs/common';
import { mkdir, writeFile } from 'fs-extra';
import { COMMAND, COMMAND_HANDLER } from '../files';
import { ICommandOptions } from '../interfaces';
import { updateIndexFileContent } from './update-index-file';
import { existsSync } from 'fs';

export const run = async (passedParams: string[], options: ICommandOptions, logger: Logger) => {
    const [name] = passedParams;
    if (!name) {
        logger.error('Error: Please provide a name using --name option 🤨');
        process.exit(1);
    }
    if (!options?.domain) {
        logger.error('Error: Please provide a domain using --domain or -d option 🤨');
        process.exit(1);
    }
    if (!existsSync(`libs/domains/src/${options.domain}-domain`)) {
        logger.error('Error: Incorrect domain name 😔');
        process.exit(1);
    }

    const domainPath = `libs/domains/src/${options.domain}-domain/application-services/commands/${name}`;
    const commandFilePath = `${domainPath}/${name}.command.ts`;
    const commandHandlerFilePath = `${domainPath}/${name}.command-handler.ts`;
    const indexFilePath = `libs/domains/src/${options.domain}-domain/application-services/commands/index.ts`;

    // Ensure directories exist
    await mkdir(domainPath, { recursive: true });

    // Create command file
    await writeFile(commandFilePath, COMMAND(name));

    // Create command handler file
    await writeFile(commandHandlerFilePath, COMMAND_HANDLER(name));

    // Update index file
    await updateIndexFileContent(indexFilePath, name);
};
