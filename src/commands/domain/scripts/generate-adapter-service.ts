import { Logger } from '@nestjs/common';
import { capitalizeName } from '@utils';
import { existsSync, mkdirSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';

// Путь к файлу
const filePath = (name: string) =>
    join('src', 'infrastructure', `${name.toLowerCase()}-adapter`, `${name.toLowerCase()}-adapter.service.ts`);

// Начальное содержимое файла
const initialContent = (name: string) => `import { ${capitalizeName(
    name,
)}Repository } from '@domains/${name.toLowerCase()}-domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${capitalizeName(name)}AdapterService implements ${capitalizeName(name)}Repository {}
`;

export const generateAdapterService = (name: string, logger: Logger) => {
    try {
        // Проверяем, существует ли файл
        if (!existsSync(filePath(name))) {
            // Создаем необходимые директории, если они не существуют
            mkdirSync(dirname(filePath(name)), { recursive: true });

            // Создаем файл с начальным содержимым
            writeFileSync(filePath(name), initialContent(name));
            logger.verbose(`File ${filePath(name)} has been created.`);
        }
    } catch (error) {
        logger.error(error);
    }
};
