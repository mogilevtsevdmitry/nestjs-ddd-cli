import { Logger } from '@nestjs/common';
import { capitalizeName } from '@utils';
import { readFile, writeFile } from 'fs-extra';

export const updateIndexFileContent = async (filePath: string, name: string, logger: Logger) => {
    const content = await readFile(filePath, 'utf8');
    const Name = capitalizeName(name);

    const importLine = `import { ${Name}QueryHandler } from './${name}/${name}.query-handler';`;
    const exportLine1 = `/** ${Name} query */
export * from './${name}/${name}.query';`;
    const exportLine2 = `/** ${Name} query handler */
export * from './${name}/${name}.query-handler';`;

    const queryHandlersMarker = 'export const QUERY_HANDLERS: Type<IQueryHandler>[] = [';
    const queryHandlersEndMarker = '];';

    if (!content.includes(queryHandlersMarker)) {
        throw new Error(`File ${filePath} does not contain QUERY_HANDLERS definition`);
    }

    // Split the content at the QUERY_HANDLERS definition.
    const [beforeQueryHandlers, afterQueryHandlers] = content.split(queryHandlersMarker);

    // Split the beforeQueryHandlers part into imports and exports.
    const [importsContent, exportsContent] = beforeQueryHandlers.split('\n\n').map((s) => s.split('\n'));

    // Add the new import/export lines.
    const updatedImportsContent = [...importsContent, importLine].join('\n');

    const lastElement = exportsContent.pop();
    const insertedElement = lastElement === '' ? [] : [lastElement];

    const updatedExportsContent = [...exportsContent, ...insertedElement, exportLine1, exportLine2].join('\n');

    // Further split the afterQueryHandlers part at the end of the QUERY_HANDLERS array.
    const [queryHandlersContent, afterQueryHandlersEnd] = afterQueryHandlers.split(queryHandlersEndMarker);

    // Prepare the updated query handlers content.
    const updatedQueryHandlersContent = queryHandlersContent
        ? `\n    ${
              queryHandlersContent.includes(',\n')
                  ? queryHandlersContent.slice(0, queryHandlersContent.length - 2)
                  : queryHandlersContent.trim()
          },\n    ${Name}QueryHandler`
        : `${Name}QueryHandler`;

    const fnUpdatedQueryHandlersContent = (queryHandlersContent: string) => {
        const _updatedQueryHandlersContent = updatedQueryHandlersContent.startsWith('\n    \n')
            ? updatedQueryHandlersContent.slice(5)
            : updatedQueryHandlersContent;
        return queryHandlersContent ? _updatedQueryHandlersContent + ',\n' : _updatedQueryHandlersContent;
    };

    // Prepare the updated content.
    const updatedContent = [
        updatedImportsContent,
        '\n' + updatedExportsContent,
        '\n' + `${queryHandlersMarker}${fnUpdatedQueryHandlersContent(queryHandlersContent)}${queryHandlersEndMarker}`,
        afterQueryHandlersEnd.trim(),
    ].join('\n');

    await writeFile(filePath, updatedContent, 'utf8');
    logger.verbose(`UPDATED ${filePath}`);
};
