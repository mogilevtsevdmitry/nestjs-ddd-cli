import { Logger } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Путь к файлу app.module.ts
const appModulePath = (apps: string) => join(apps, 'src', 'app.module.ts');
const newImportLine = `import { InfrastructureModule } from './infrastructure/infrastructure.module';\n`;

function addInfrastructureModule(fileContent: string) {
    // Prepare new lines to be added
    const newModuleImport = `        InfrastructureModule,`;

    // Insert new import line if not exists
    if (!fileContent.includes(newImportLine.trim())) {
        fileContent = `${newImportLine}${fileContent}`;
    }

    // Regex to find @Module decorator
    const moduleDecoratorRegex = /@Module\(\{[\s\S]*?\}\)/;
    const moduleDecoratorMatch = fileContent.match(moduleDecoratorRegex);

    if (moduleDecoratorMatch) {
        let moduleDecorator = moduleDecoratorMatch[0];

        // Add imports and exports sections if not exist
        if (!moduleDecorator.includes('imports: [')) {
            moduleDecorator = moduleDecorator.replace('}', '    imports: [],\n}');
        }

        // Insert new module configuration
        moduleDecorator = moduleDecorator.replace('imports: [', `imports: [\n${newModuleImport}\n`);

        // Update the file content
        fileContent = fileContent.replace(moduleDecoratorRegex, moduleDecorator);
    }

    return fileContent;
}

export const updateAppModule = (logger: Logger, apps = '') => {
    try {
        // Check if the file exists
        if (!existsSync(appModulePath(apps))) {
            throw new Error("Don't forget to add the InfrastructureModule to the imports of your main module.");
        }

        // Read the current file content
        let fileContent = readFileSync(appModulePath(apps), 'utf-8');

        if (!fileContent.includes(newImportLine)) {
            // Add the InfrastructureModule
            fileContent = addInfrastructureModule(fileContent);

            // Save the updated file content
            writeFileSync(appModulePath(apps), fileContent);

            logger.log(`File ${appModulePath(apps)} has been updated.`);
        }
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
    }
};
