import { execSync } from 'child_process';
import { join } from 'path';
import * as fs from 'fs-extra';
import prompts from 'prompts';

export const generateDomains = () => {
    const domainsIndexPath = join('libs', 'domains', 'src', 'index.ts');

    if (!fs.existsSync(domainsIndexPath)) {
        console.log('Generating library domains...');

        // Override prompts to answer the question automatically
        prompts.override({
            prefix: '@lib',
        });

        // Execute the library generation command
        execSync('nest generate library domains', { stdio: 'inherit' });

        console.log('Updating tsconfig.json...');
        const tsconfigPath = join(process.cwd(), 'tsconfig.json');
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

        // Remove unnecessary aliases
        delete tsconfig.compilerOptions.paths['@lib/domains'];
        delete tsconfig.compilerOptions.paths['@lib/domains/*'];

        // Update tsconfig.json
        tsconfig.compilerOptions.paths['@lib'] = ['libs/domains/src'];
        tsconfig.compilerOptions.paths['@lib/*'] = ['libs/domains/src/*'];
        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

        // Remove unnecessary files and create empty index.ts
        console.log('Cleaning up and creating empty index.ts...');
        fs.removeSync(join('libs', 'domains', 'src'));
        fs.writeFileSync(domainsIndexPath, '');
    }
};
