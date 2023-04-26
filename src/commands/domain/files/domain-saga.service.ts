import { capitalizeName } from '@utils';
import { join } from 'path';

export const DOMAIN_SAGA_SERVICE = (basePath: string, name: string) => ({
    path: join(basePath, 'sagas', `${name}-saga.service.ts`),
    content: `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${capitalizeName(name)}SagaService {}
`,
});
