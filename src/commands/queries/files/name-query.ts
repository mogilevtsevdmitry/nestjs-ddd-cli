import { capitalizeName } from '@utils';

export const QUERY = (name: string) => `export class ${capitalizeName(name)}Query {
    constructor() {}
}
`;
