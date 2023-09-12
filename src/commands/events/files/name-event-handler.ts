import { capitalizeName } from '@utils';

export const EVENT_HANDLER = (name: string) => `import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ${capitalizeName(name)}Event } from './${name}.event';

@EventsHandler(${capitalizeName(name)}Event)
export class ${capitalizeName(name)}EventHandler implements IEventHandler {
    handle(event: ${capitalizeName(name)}Event) {
        // your code here
        return event;
    }
}
`;
