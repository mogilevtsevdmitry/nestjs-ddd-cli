import { capitalizeName } from '@utils';

export const EVERY = (name: string) => `export class ${capitalizeName(name)}Event {
    constructor() {}
}
`;
