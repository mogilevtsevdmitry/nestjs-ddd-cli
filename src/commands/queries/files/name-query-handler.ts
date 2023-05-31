import { capitalizeName } from '@utils';

export const QUERY_HANDLER = (name: string) => `import { Logger } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ${capitalizeName(name)}Query } from './${name}.query';

@QueryHandler(${capitalizeName(name)}Query)
export class ${capitalizeName(name)}QueryHandler implements IQueryHandler<${capitalizeName(name)}Query, void> {
    private readonly logger = new Logger(${capitalizeName(name)}QueryHandler.name);
    constructor() {}

    async execute(query: ${capitalizeName(name)}Query): Promise<void> {
        // your code here
    }
}
`;
