import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import { join } from 'path';

export const generateDomains = () => {
    const logger = new Logger('GenerateDomains');
    const domainsIndexPath = join('libs', 'domains', 'src', 'index.ts');

    if (!fs.existsSync(domainsIndexPath)) {
        // Update tsconfig.json
        logger.verbose('Updating tsconfig.json...');
        const tsconfigPath = join(process.cwd(), 'tsconfig.json');
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

        // Update aliases
        tsconfig.compilerOptions.paths['@lib'] = ['libs/domains/src'];
        tsconfig.compilerOptions.paths['@lib/*'] = ['libs/domains/src/*'];

        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

        // Create empty index.ts
        logger.verbose('Creating empty index.ts...');
        fs.ensureFileSync(domainsIndexPath);

        // Update package.json
        logger.verbose('Updating package.json...');
        const packageJsonPath = join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // Add Jest root and moduleNameMapper
        if (!packageJson.jest) {
            packageJson.jest = {};
        }

        if (!packageJson.jest.roots) {
            packageJson.jest.roots = [];
        }
        packageJson.jest.roots.push('<rootDir>/libs/');

        if (!packageJson.jest.moduleNameMapper) {
            packageJson.jest.moduleNameMapper = {};
        }
        packageJson.jest.moduleNameMapper['^@lib(|/.*)$'] = '<rootDir>/libs/$1';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // Update test/jest-e2e.json
        logger.verbose('Updating test/jest-e2e.json...');
        const jestE2EPath = join(process.cwd(), 'test', 'jest-e2e.json');
        const jestE2E = JSON.parse(fs.readFileSync(jestE2EPath, 'utf8'));

        // Add moduleNameMapper
        if (!jestE2E.moduleNameMapper) {
            jestE2E.moduleNameMapper = {};
        }
        jestE2E.moduleNameMapper['@lib/(.*)'] = '<rootDir>/../libs/$1';
        jestE2E.moduleNameMapper['@lib'] = '<rootDir>/../libs';

        fs.writeFileSync(jestE2EPath, JSON.stringify(jestE2E, null, 2));
    }
};
