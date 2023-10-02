import { Logger } from '@nestjs/common';
import { format } from '@utils';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs-extra';
import { COMMAND, COMMAND_HANDLER } from '../files';
import { ICommandOptions } from '../interfaces';
import { updateIndexFileContent } from './update-index-file';

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

    const basePath = `libs/domains/src/${options.domain}-domain/application-services/commands/`;
    const domainPath = `${basePath}${name}`;

    if (existsSync(domainPath)) {
        logger.error(`Error: Command "${name}" already exists 😔`);
        process.exit(1);
    }

    const commandFilePath = `${domainPath}/${name}.command.ts`;
    const commandHandlerFilePath = `${domainPath}/${name}.command-handler.ts`;
    const indexFilePath = `${basePath}index.ts`;

    // Ensure directories exist
    await mkdir(domainPath, { recursive: true });

    // Create command file
    await writeFile(commandFilePath, COMMAND(name));
    logger.log(`CREATE ${commandFilePath}`);

    // Create command handler file
    await writeFile(commandHandlerFilePath, COMMAND_HANDLER(name));
    logger.log(`CREATE ${commandHandlerFilePath}`);

    // Update index file
    await updateIndexFileContent(indexFilePath, name, logger);

    // if passed format option - run formatting
    if (options?.format) {
        format(basePath);
    }
};
