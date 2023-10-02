import { Logger } from '@nestjs/common';
import { capitalizeName } from '@utils';
import { readFile, writeFile } from 'fs-extra';

export const updateIndexFileContent = async (filePath: string, name: string, logger: Logger) => {
    const content = await readFile(filePath, 'utf8');
    const Name = capitalizeName(name);

    const importLine = `import { ${Name}EventHandler } from './${name}/${name}.event-handler';`;
    const exportLine1 = `/** ${Name} event */
export * from './${name}/${name}.event';`;
    const exportLine2 = `/** ${Name} event handler */
export * from './${name}/${name}.event-handler';`;

    const eventHandlersMarker = 'export const EVENT_HANDLERS: Type<IEventHandler>[] = [';
    const eventHandlersEndMarker = '];';

    if (!content.includes(eventHandlersMarker)) {
        throw new Error(`File ${filePath} does not contain EVENT_HANDLERS definition`);
    }

    // Split the content at the EVENT_HANDLERS definition.
    const [beforeEventHandlers, afterEventHandlers] = content.split(eventHandlersMarker);

    // Split the beforeEventHandlers part into imports and exports.
    const [importsContent, exportsContent] = beforeEventHandlers.split('\n\n').map((s) => s.split('\n'));

    // Add the new import/export lines.
    const updatedImportsContent = [...importsContent, importLine].join('\n');

    const lastElement = exportsContent.pop();
    const insertedElement = lastElement === '' ? [] : [lastElement];

    const updatedExportsContent = [...exportsContent, ...insertedElement, exportLine1, exportLine2].join('\n');

    // Further split the afterEventHandlers part at the end of the EVENT_HANDLERS array.
    const [eventHandlersContent, afterEventHandlersEnd] = afterEventHandlers.split(eventHandlersEndMarker);

    // Prepare the updated event handlers content.
    const updatedEventHandlersContent = eventHandlersContent
        ? `\n    ${
              eventHandlersContent.includes(',\n')
                  ? eventHandlersContent.slice(0, eventHandlersContent.length - 2)
                  : eventHandlersContent.trim()
          },\n    ${Name}EventHandler`
        : `${Name}EventHandler`;

    const fnUpdatedEventHandlersContent = (eventHandlersContent: string) => {
        const _updatedEventHandlersContent = updatedEventHandlersContent.startsWith('\n    \n')
            ? updatedEventHandlersContent.slice(5)
            : updatedEventHandlersContent;
        return eventHandlersContent ? _updatedEventHandlersContent + ',\n' : _updatedEventHandlersContent;
    };

    // Prepare the updated content.
    const updatedContent = [
        updatedImportsContent,
        '\n' + updatedExportsContent,
        '\n' + `${eventHandlersMarker}${fnUpdatedEventHandlersContent(eventHandlersContent)}${eventHandlersEndMarker}`,
        afterEventHandlersEnd.trim(),
    ].join('\n');

    await writeFile(filePath, updatedContent, 'utf8');
    logger.verbose(`UPDATED ${filePath}`);
};
