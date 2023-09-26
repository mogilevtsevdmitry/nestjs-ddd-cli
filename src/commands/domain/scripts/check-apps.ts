import { existsSync, readdirSync } from 'fs';
import * as inquirer from 'inquirer';

export const checkAppsFolder = async (appsFolderPath: string) => {
    try {
        if (existsSync(appsFolderPath)) {
            const apps = readdirSync(appsFolderPath);
            if (apps.length > 0) {
                const { selectedApp } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectedApp',
                        message: 'Какой проект вы хотите выбрать?',
                        choices: apps,
                    },
                ]);
                return `apps/${selectedApp}`;
            }
        }
        return '';
    } catch (error) {
        return '';
    }
};
