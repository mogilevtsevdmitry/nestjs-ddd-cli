import { capitalizeName } from '@utils';
import { readFile, writeFile } from 'fs-extra';

export const updateIndexFileContent = async (filePath: string, name: string) => {
    const content = await readFile(filePath, 'utf8');
    const Name = capitalizeName(name);

    const importLine = `import { ${Name}CommandHandler } from './${name}/${name}.command-handler';`;
    const exportLine1 = `/** ${Name} command */
export * from './${name}/${name}.command';`;
    const exportLine2 = `/** ${Name} command handler */
export * from './${name}/${name}.command-handler';`;

    const commandHandlersMarker = 'export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [';
    const commandHandlersEndMarker = '];';

    if (!content.includes(commandHandlersMarker)) {
        throw new Error(`File ${filePath} does not contain COMMAND_HANDLERS definition`);
    }

    // Split the content at the COMMAND_HANDLERS definition.
    const [beforeCommandHandlers, afterCommandHandlers] = content.split(commandHandlersMarker);

    // Split the beforeCommandHandlers part into imports and exports.
    const [importsContent, exportsContent] = beforeCommandHandlers.split('\n\n').map((s) => s.split('\n'));

    // Add the new import/export lines.
    const updatedImportsContent = [...importsContent, importLine].join('\n');

    const lastElement = exportsContent.pop();
    const insertedElement = lastElement === '' ? [] : [lastElement];

    const updatedExportsContent = [...exportsContent, ...insertedElement, exportLine1, exportLine2].join('\n');

    // Further split the afterCommandHandlers part at the end of the COMMAND_HANDLERS array.
    const [commandHandlersContent, afterCommandHandlersEnd] = afterCommandHandlers.split(commandHandlersEndMarker);

    // Prepare the updated command handlers content.
    const updatedCommandHandlersContent = commandHandlersContent
        ? `\n    ${
              commandHandlersContent.includes(',\n')
                  ? commandHandlersContent.slice(0, commandHandlersContent.length - 2)
                  : commandHandlersContent.trim()
          },\n    ${Name}CommandHandler`
        : `${Name}CommandHandler`;

    const fnUpdatedCommandHandlersContent = (commandHandlersContent: string) => {
        const _updatedCommandHandlersContent = updatedCommandHandlersContent.startsWith('\n    \n')
            ? updatedCommandHandlersContent.slice(5)
            : updatedCommandHandlersContent;
        return commandHandlersContent ? _updatedCommandHandlersContent + ',\n' : _updatedCommandHandlersContent;
    };

    // Prepare the updated content.
    const updatedContent = [
        updatedImportsContent,
        '\n' + updatedExportsContent,
        '\n' +
            `${commandHandlersMarker}${fnUpdatedCommandHandlersContent(
                commandHandlersContent,
            )}${commandHandlersEndMarker}`,
        afterCommandHandlersEnd.trim(),
    ].join('\n');

    await writeFile(filePath, updatedContent, 'utf8');
};
