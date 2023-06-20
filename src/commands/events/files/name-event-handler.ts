import { capitalizeName } from '@utils';

export const EVENT_HANDLER = (name: string) => `import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ${capitalizeName(name)}Event } from './${name}.event';

@EventsHandler(${capitalizeName(name)}Event)
export class ${capitalizeName(name)}EventHandler implements IEventHandler {
    private readonly logger = new Logger(${capitalizeName(name)}EventHandler.name);
    constructor() {}

    handle(event: ${capitalizeName(name)}Event): ${capitalizeName(name)}Event {
        // your code here
        return event;
    }
}
`;
