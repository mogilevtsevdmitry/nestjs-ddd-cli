import { Logger } from '@nestjs/common';
import { format } from '@utils';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs-extra';
import { QUERY, QUERY_HANDLER } from '../files';
import { IQueryOptions } from '../interfaces';
import { updateIndexFileContent } from './update-index-file';

export const run = async (passedParams: string[], options: IQueryOptions, logger: Logger) => {
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

    const basePath = `libs/domains/src/${options.domain}-domain/application-services/queries/`;
    const domainPath = `${basePath}${name}`;

    if (existsSync(domainPath)) {
        logger.error(`Error: Query ${name} already exists 😔`);
        process.exit(1);
    }

    const queryFilePath = `${domainPath}/${name}.query.ts`;
    const queryHandlerFilePath = `${domainPath}/${name}.query-handler.ts`;
    const indexFilePath = `${basePath}index.ts`;

    // Ensure directories exist
    await mkdir(domainPath, { recursive: true });

    // Create query file
    await writeFile(queryFilePath, QUERY(name));
    logger.log(`CREATE ${queryFilePath}`);

    // Create query handler file
    await writeFile(queryHandlerFilePath, QUERY_HANDLER(name));
    logger.log(`CREATE ${queryHandlerFilePath}`);

    // Update index file
    await updateIndexFileContent(indexFilePath, name, logger);

    // if passed format option - run formatting
    if (options?.format) {
        format(basePath);
    }
};
