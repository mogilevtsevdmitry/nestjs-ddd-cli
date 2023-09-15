import { Logger } from '@nestjs/common';
import { capitalizeName } from '@utils';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

// Путь к файлу
const filePath = join('src', 'infrastructure', 'infrastructure-module.ts');

// Начальное содержимое файла
const initialContent = `import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
    ],
    providers: [
    ],
    exports: [
    ],
})
export class InfrastructureModule {}
`;

function addModule(fileContent: string, name: string) {
    const Name = capitalizeName(name);
    const lowerName = name.toLowerCase();

    // Prepare new lines to be added
    const newImportLines = `import { ${Name}DomainModule } from '@domains/${lowerName}-domain';\nimport { ${Name}AdapterService } from './${lowerName}-adapter/${lowerName}-adapter-service';`;
    const newModuleEntry = `        ${Name}DomainModule.register({ ${lowerName}Providers: ${Name}AdapterService }),`;
    const newProvider = `        ${Name}AdapterService,`;
    const newExport = `        ${Name}DomainModule,`;

    // Split the existing content into sections
    const [importsSection, moduleSection] = fileContent.split('@Global()');

    // Insert new import lines
    const updatedImports = `${importsSection.slice(0, importsSection.length - 1)}${newImportLines}`;

    // Insert new module configuration
    const updatedModule = moduleSection
        .replace('imports: [', `imports: [\n${newModuleEntry}`)
        .replace('providers: [', `providers: [\n${newProvider}`)
        .replace('exports: [', `exports: [\n${newExport}`);

    return `${updatedImports}\n\n@Global()${updatedModule}`;
}

export const generateDomainsAdapter = (name: string, logger: Logger) => {
    try {
        // Проверяем, существует ли файл
        if (!existsSync(filePath)) {
            // Создаем необходимые директории, если они не существуют
            mkdirSync(dirname(filePath), { recursive: true });

            // Создаем файл с начальным содержимым
            writeFileSync(filePath, initialContent);
        }

        // Читаем текущее содержимое файла
        let fileContent = readFileSync(filePath, 'utf-8');

        // Добавляем модули
        fileContent = addModule(fileContent, name);

        // Сохраняем обновленное содержимое файла
        writeFileSync(filePath, fileContent);

        logger.verbose(`File ${filePath} has been updated.`);
    } catch (error) {
        logger.error(error);
    }
};
