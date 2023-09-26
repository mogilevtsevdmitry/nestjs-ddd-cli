import { Logger } from '@nestjs/common';
import { capitalizeName } from '@utils';
import { existsSync, mkdirSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';

const filePath = (name: string, apps: string) =>
    join(apps, 'src', 'infrastructure', `${name.toLowerCase()}-adapter`, `${name.toLowerCase()}-adapter.service.ts`);

const initialContent = (name: string) => `import { ${capitalizeName(
    name,
)}Repository } from '@domains/${name.toLowerCase()}-domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${capitalizeName(name)}AdapterService implements ${capitalizeName(name)}Repository {}
`;

export const generateAdapterService = (name: string, logger: Logger, apps = '') => {
    try {
        if (!existsSync(filePath(name, apps))) {
            mkdirSync(dirname(filePath(name, apps)), { recursive: true });

            writeFileSync(filePath(name, apps), initialContent(name));
            logger.verbose(`File ${filePath(name, apps)} has been created.`);
        }
    } catch (error) {
        logger.error(error);
    }
};
