import { Logger } from '@nestjs/common';
import { capitalizeName, lowerName } from '@utils';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const filePath = (apps: string) => join(apps, 'src', 'infrastructure', 'infrastructure.module.ts');

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

    // Prepare new lines to be added
    const newImportLines = `import { ${Name}DomainModule } from '@domains/${name.toLowerCase()}-domain';\nimport { ${Name}AdapterService } from './${name.toLowerCase()}-adapter/${name.toLowerCase()}-adapter.service';`;
    const newModuleEntry = `        ${Name}DomainModule.register({ ${lowerName(
        name,
    )}Providers: ${Name}AdapterService }),`;
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

export const generateDomainsAdapter = (name: string, logger: Logger, apps = '') => {
    try {
        if (!existsSync(filePath(apps))) {
            mkdirSync(dirname(filePath(apps)), { recursive: true });
            writeFileSync(filePath(apps), initialContent);
        }

        let fileContent = readFileSync(filePath(apps), 'utf-8');

        fileContent = addModule(fileContent, name);

        writeFileSync(filePath(apps), fileContent);

        logger.verbose(`File ${filePath(apps)} has been updated.`);
    } catch (error) {
        logger.error(error);
    }
};
