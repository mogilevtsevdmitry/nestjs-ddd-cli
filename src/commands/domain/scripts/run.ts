import { Logger } from '@nestjs/common';
import { generateDomains } from '@utils';
import { ensureDirSync, ensureFileSync, existsSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { defaultFiles } from '../files/default';
import { defaultStructures } from '../folders/default';
import { generateDomainsAdapter } from './generate-domains-adapter';

export const run = (inputs: string[], ...args: Array<() => void>) => {
    const logger = new Logger('[Scripts] run');
    const [name] = inputs;

    if (!name) {
        logger.error('Error: Please provide a name using --name option');
        process.exit(1);
    }

    // Check if domain with the same name exists
    const domainPath = join('libs', 'domains', 'src', `${name}-domain`);
    if (existsSync(domainPath)) {
        logger.error(`Error: Domain with name "${name}" already exists!`);
        process.exit(1);
    }

    // Check domains exists
    generateDomains();

    const basePath = join('libs', 'domains', 'src', `${name}-domain`);

    // Create the required directories
    const directories = defaultStructures(basePath);
    directories.forEach((dir) => ensureDirSync(dir));

    // Create the required files
    const files = defaultFiles(basePath, name);
    files.forEach((file) => {
        logger.log(`CREATE ${file.path}`);
        ensureFileSync(file.path);
        if (file.content) {
            files.filter((file) => file.content).forEach((file) => writeFileSync(file.path, file.content));
        }
    });

    // Generate domains adapters
    generateDomainsAdapter(name, logger);

    logger.verbose(`Domain structure for ${name} has been generated successfully.`);
};
