import { join } from 'path';

export const defaultStructures = (basePath: string) => [
    join(basePath, 'application-services', 'commands'),
    join(basePath, 'application-services', 'dto'),
    join(basePath, 'application-services', 'events'),
    join(basePath, 'application-services', 'facade'),
    join(basePath, 'application-services', 'queries'),
    join(basePath, 'domain', 'services'),
    join(basePath, 'repositories'),
    join(basePath, 'sagas'),
];
