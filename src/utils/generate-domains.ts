import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import { join } from 'path';

export const generateDomains = () => {
    const logger = new Logger('GenerateDomains', { timestamp: false });
    const gitkeep = join('libs', 'domains', 'src', 'index.ts');

    if (!fs.existsSync(gitkeep)) {
        // Create empty .gitkeep
        fs.ensureFileSync(gitkeep);

        // Update tsconfig.json
        logger.verbose('UPDATING tsconfig.json...');
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
        logger.verbose('UPDATING package.json...');
        const packageJsonPath = join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        // update rootDir
        packageJson.rootDir = '.';

        // Add Jest root and moduleNameMapper
        if (!packageJson.jest) {
            packageJson.jest = {};
        }

        if (!packageJson.jest.roots) {
            packageJson.jest.roots = [];
        }
        if (!packageJson.jest.roots.includes('<rootDir>/src/')) {
            packageJson.jest.roots.push('<rootDir>/src/');
        }
        packageJson.jest.roots.push('<rootDir>/libs/');

        if (!packageJson.jest.moduleNameMapper) {
            packageJson.jest.moduleNameMapper = {};
        }
        packageJson.jest.moduleNameMapper['^@domains(|/.*)$'] = '<rootDir>/libs/$1';

        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
        // update format
        packageJson.scripts.format = 'prettier --write "src/**/*.ts" "test/**/*.ts" "libs/**/*.ts"';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // Update test/jest-e2e.json
        logger.verbose('UPDATING test/jest-e2e.json...');
        const jestE2EPath = join(process.cwd(), 'test', 'jest-e2e.json');
        const jestE2E = JSON.parse(fs.readFileSync(jestE2EPath, 'utf8'));

        // Add moduleNameMapper
        if (!jestE2E.moduleNameMapper) {
            jestE2E.moduleNameMapper = {};
        }
        jestE2E.moduleNameMapper['@domains/(.*)'] = '<rootDir>/../libs/$1';
        jestE2E.moduleNameMapper['@domains'] = '<rootDir>/../libs';

        fs.writeFileSync(jestE2EPath, JSON.stringify(jestE2E, null, 2));

        // Update nest-cli.json
        logger.verbose('UPDATING nest-cli.json...');
        const nestCliPath = join(process.cwd(), 'nest-cli.json');
        const nestCli = JSON.parse(fs.readFileSync(nestCliPath, 'utf8'));

        nestCli.compilerOptions['webpack'] = true;
        if (!nestCli.projects) {
            nestCli.projects = {};
        }
        if (!nestCli.projects['domains']) {
            nestCli.projects['domains'] = {
                type: 'library',
                root: 'libs/domains',
                entryFile: 'index',
                sourceRoot: 'libs/domains/src',
                compilerOptions: {
                    tsConfigPath: 'libs/domains/tsconfig.lib.json',
                },
            };
        }
        fs.writeFileSync(nestCliPath, JSON.stringify(nestCli, null, 2));

        // add tsconfig.lib.json
        logger.log('CREATE libs/domains/tsconfig.lib.json...');
        const tsConfigLibPath = join('libs', 'domains', 'tsconfig.lib.json');
        if (!fs.existsSync(tsConfigLibPath)) {
            fs.ensureFileSync(tsConfigLibPath);
            const tsConfigLibContent = `{
"extends": "../../tsconfig.json",
"compilerOptions": {
    "declaration": true,
    "outDir": "../../dist/libs/domains"
},
"include": ["src/**/*"],
"exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}`;
            fs.writeFileSync(tsConfigLibPath, tsConfigLibContent);
        }
    }
};
