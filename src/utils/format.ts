import { Logger } from '@nestjs/common';
import { ExecException, exec } from 'child_process';

export const format = (filePath: string) => {
    Logger.log('Start formatting', 'FORMAT');

    exec(`npx prettier --write ${filePath}`);

    exec(`npx eslint --fix ${filePath}`, (error: ExecException, stdout: string, stderr: string) => {
        if (stdout) {
            Logger.log('Formatting success 🙌', 'FORMAT');
        }
    });
};
