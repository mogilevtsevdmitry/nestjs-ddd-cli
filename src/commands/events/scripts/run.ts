import { Logger } from '@nestjs/common';
import { format } from '@utils';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs-extra';
import { EVERY, EVENT_HANDLER } from '../files';
import { IEventOptions } from '../interfaces';
import { updateIndexFileContent } from './update-index-file';

export const run = async (passedParams: string[], options: IEventOptions, logger: Logger) => {
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

    const basePath = `libs/domains/src/${options.domain}-domain/application-services/events/`;
    const domainPath = `${basePath}${name}`;

    if (existsSync(domainPath)) {
        logger.error(`Error: Event ${name} already exists 😔`);
        process.exit(1);
    }

    const eventFilePath = `${domainPath}/${name}.event.ts`;
    const eventHandlerFilePath = `${domainPath}/${name}.event-handler.ts`;
    const indexFilePath = `${basePath}index.ts`;

    // Ensure directories exist
    await mkdir(domainPath, { recursive: true });

    // Create event file
    await writeFile(eventFilePath, EVERY(name));

    // Create event handler file
    await writeFile(eventHandlerFilePath, EVENT_HANDLER(name));

    // Update index file
    await updateIndexFileContent(indexFilePath, name);

    // if passed format option - run formatting
    if (options?.format) {
        format(basePath);
    }
};
