import { join } from 'path';

export const defaultFiles = (basePath: string) => [
    {
        path: join(basePath, 'application-services', 'commands', 'index.ts'),
    },
    {
        path: join(basePath, 'application-services', 'dto', 'index.ts'),
    },
    {
        path: join(basePath, 'application-services', 'events', 'index.ts'),
    },
    {
        path: join(basePath, 'application-services', 'facade', `${name}-facade.factory.ts`),
    },
    {
        path: join(basePath, 'application-services', 'facade', `${name}-facade.service.ts`),
    },
    {
        path: join(basePath, 'application-services', 'queries', 'index.ts'),
    },
    {
        path: join(basePath, 'domain', 'services', 'domain.services.ts'),
    },
    {
        path: join(basePath, 'domain', `${name}.interface.ts`),
    },
    {
        path: join(basePath, 'domain', `${name}.aggregate.ts`),
    },
    {
        path: join(basePath, 'domain', 'index.ts'),
    },
    {
        path: join(basePath, 'repositories', `${name}-repository.abstract.ts`),
    },
    {
        path: join(basePath, 'repositories', 'index.ts'),
    },
    {
        path: join(basePath, 'sagas', `${name}-saga.service.ts`),
    },
    {
        path: join(basePath, `${name}-domen.module.ts`),
    },
    {
        path: join(basePath, 'index.ts'),
    },
];
