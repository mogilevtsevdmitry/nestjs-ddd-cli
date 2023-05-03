import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import { join } from 'path';

export const generateDomains = () => {
    const logger = new Logger('GenerateDomains');
    const gitkeep = join('libs', 'domains', 'src', '.gitkeep');

    if (!fs.existsSync(gitkeep)) {
        // Create empty .gitkeep
        logger.verbose('Creating empty gitkeep...');
        fs.ensureFileSync(gitkeep);

        // Update tsconfig.json
        logger.verbose('Updating tsconfig.json...');
        const tsconfigPath = join(process.cwd(), 'tsconfig.json');
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

        // Update aliases
        if (!tsconfig.compilerOptions.paths) {
            tsconfig.compilerOptions.paths = {};
        }
        tsconfig.compilerOptions.paths['@domains'] = ['libs/domains/src'];
        tsconfig.compilerOptions.paths['@domains/*'] = ['libs/domains/src/*'];

        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

        // Update package.json
        logger.verbose('Updating package.json...');
        const packageJsonPath = join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // update format
        packageJson.format = 'prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\" \\"libs/**/*.ts\\"';
        // update rootDir
        packageJson.rootDir = '"."';

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
        packageJson.jest.moduleNameMapper['^@domains(|/.*)$'] = '<rootDir>/libs/$1';

        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
        packageJson.scripts['generate:domain'] = 'generate-domain';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // Update test/jest-e2e.json
        logger.verbose('Updating test/jest-e2e.json...');
        const jestE2EPath = join(process.cwd(), 'test', 'jest-e2e.json');
        const jestE2E = JSON.parse(fs.readFileSync(jestE2EPath, 'utf8'));

        // Add moduleNameMapper
        if (!jestE2E.moduleNameMapper) {
            jestE2E.moduleNameMapper = {};
        }
        jestE2E.moduleNameMapper['@domains/(.*)'] = '<rootDir>/../libs/$1';
        jestE2E.moduleNameMapper['@ldomainsib'] = '<rootDir>/../libs';

        fs.writeFileSync(jestE2EPath, JSON.stringify(jestE2E, null, 2));
    }
};
