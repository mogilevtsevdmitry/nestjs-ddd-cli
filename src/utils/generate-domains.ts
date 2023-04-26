import * as spawn from 'cross-spawn';
import * as fs from 'fs-extra';
import { join } from 'path';

export const generateDomains = async () => {
    const domainsIndexPath = join('libs', 'domains', 'src', 'index.ts');

    if (!fs.existsSync(domainsIndexPath)) {
        console.log('Generating library domains...');

        // Execute the library generation command with an automatic answer
        const libraryGeneration = spawn('nest', ['generate', 'library', 'domains'], {
            stdio: 'pipe',
        });

        libraryGeneration.stdout.on('data', (data) => {
            console.log(data.toString());
            if (data.toString().includes('What prefix would you like to use for the library (default: @app)?')) {
                libraryGeneration.stdin.write('@lib\n');
                libraryGeneration.stdin.end();
            }
        });

        libraryGeneration.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        libraryGeneration.on('close', (code) => {
            if (code === 0) {
                // Update tsconfig.json
                console.log('Updating tsconfig.json...');
                const tsconfigPath = join(process.cwd(), 'tsconfig.json');
                const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

                // Remove unnecessary aliases
                delete tsconfig.compilerOptions.paths['@lib/domains'];
                delete tsconfig.compilerOptions.paths['@lib/domains/*'];

                // Update aliases
                tsconfig.compilerOptions.paths['@lib'] = ['libs/domains/src'];
                tsconfig.compilerOptions.paths['@lib/*'] = ['libs/domains/src/*'];

                fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

                // Remove unnecessary files and create empty index.ts
                console.log('Cleaning up and creating empty index.ts...');
                fs.removeSync(join('libs', 'domains', 'src'));
                fs.writeFileSync(domainsIndexPath, '');
            }
        });
    }
};
