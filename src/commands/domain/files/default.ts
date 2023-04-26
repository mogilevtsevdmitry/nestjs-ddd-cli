import { COMMANDS_INDEX } from './commands.index';
import { DEFAULT_INDEX } from './default.index';
import { DOMAIN_FACADE_FACTORY } from './domain-facade.factory';
import { DOMAIN_FACADE_INDEX } from './domain-facade.index';
import { DOMAIN_FACADE_SERVICE } from './domain-facade.service';
import { DOMAIN_REPOSITORY } from './domain-repository.abstract';
import { DOMAIN_SAGA_SERVICE } from './domain-saga.service';
import { DOMAIN_AGGREGATE } from './domain.aggregate';
import { DOMAIN_INDEX } from './domain.index';
import { DOMAIN_INTERFACE } from './domain.interface';
import { DOMAIN_SERVICES } from './domain.services';
import { DTO_INDEX } from './dto.index';
import { EVENTS_INDEX } from './events.index';
import { DOMAIN_MODULE } from './name-domain.module';
import { QUERIES_INDEX } from './queries.index';
import { REPOSITORIES_INDEX } from './repositories.index';

interface File {
    path: string;
    content?: string;
}

export const defaultFiles = (basePath: string, name: string): File[] => [
    COMMANDS_INDEX(basePath),
    DOMAIN_AGGREGATE(basePath, name),
    DOMAIN_INDEX(basePath, name),
    DOMAIN_INTERFACE(basePath, name),
    DOMAIN_FACADE_INDEX(basePath, name),
    DOMAIN_FACADE_FACTORY(basePath, name),
    DOMAIN_FACADE_SERVICE(basePath, name),
    DOMAIN_REPOSITORY(basePath, name),
    DOMAIN_SAGA_SERVICE(basePath, name),
    DOMAIN_SERVICES(basePath, name),
    DTO_INDEX(basePath),
    EVENTS_INDEX(basePath),
    REPOSITORIES_INDEX(basePath, name),
    QUERIES_INDEX(basePath),
    DOMAIN_MODULE(basePath, name),
    DEFAULT_INDEX(basePath, name),
];
