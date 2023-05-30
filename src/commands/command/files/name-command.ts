import { capitalizeName } from '@utils';

export const COMMAND = (name: string) => `export class ${capitalizeName(name)}Command {
    constructor() {}
}
`;
