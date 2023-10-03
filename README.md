## Installation
To install the application for generating folder and file structures for your domain in a NestJS project, you can use the @webmogilevtsev/nestjs-ddd-cli package. You can install it using the following command:
```bash
npm install @webmogilevtsev/nestjs-ddd-cli --save-dev
```
After installing the package, you need to add a script to the package.json file to be able to run the generate:domain command. Add the following line to the `"scripts"` section:
```bash
"scripts": {
  ...
  "generate:domain": "ddd-cli domain --",
  "generate:command": "ddd-cli command",
  "generate:query": "ddd-cli query",
  "generate:event": "ddd-cli event"
}

```

## Global Installation
You can also install @webmogilevtsev/nestjs-ddd-cli globally to use the generate-domain command in any NestJS project. To do this, run the following command:
```bash
npm install -g @webmogilevtsev/nestjs-ddd-cli
```
After the global installation, you can run the generate-domain command from any directory on your computer:
```bash
generate-domain my-name
```

## Description

This is an application for generating folder and file structure for a domain in a NestJS project. The `generate:domain` command generates the folder and file structure for a new domain, including the following directories:

- `libs/domains/src/${name}-domain/application-services/commands`
- `libs/domains/src/${name}-domain/application-services/dto`
- `libs/domains/src/${name}-domain/application-services/events`
- `libs/domains/src/${name}-domain/application-services/facade`
- `libs/domains/src/${name}-domain/application-services/queries`
- `libs/domains/src/${name}-domain/domain/services`
- `libs/domains/src/${name}-domain/domain/repositories`
- `libs/domains/src/${name}-domain/domain/sagas`
- `libs/domains/src/${name}-domain/domain`
- `src/infrastructure/${name}-adapter/${name}-adapter.service`
- `src/infrastructure/infrastructure-module`

## Commands
### generate:domain
Domain generation

<b>Options:</b>

<table>
  <thead>
    <th>#</th>
    <th>Option Name</th>
    <th>Short Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Example</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>String</td>
      <td>Yes</td>
      <td>--name=my-name | -n my-name</td>
      <td>Sets the domain name</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Boolean</td>
      <td>No</td>
      <td>--format=true | -f</td>
      <td>Performs formatting using prettier and eslint</td>
    </tr>
  </tbody>
</table>

To generate a new domain, run the generate:domain command with the name argument, which sets the domain name:
```bash
npm run generate:domain --name=my-name --format=true
# Shortened notation
npm run generate:domain my-name -f
```

### generate:command
Command generation

<b>Options:</b>

<table>
  <thead>
    <th>#</th>
    <th>Option Name</th>
    <th>Short Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Example</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>String</td>
      <td>Yes</td>
      <td>--name=my-name | -n my-name</td>
      <td>Sets the command name</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>String</td>
      <td>Yes</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Specifies the domain for which to generate the command</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Boolean</td>
      <td>No</td>
      <td>--format=true | -f</td>
      <td>Performs formatting using prettier and eslint</td>
    </tr>
  </tbody>
</table>

To generate a new command for a domain, run the generate:command command with the name, domain, and optional --format arguments:
```bash
npm run generate:command --name=create-my-name -- --domain=my-name --format=true
# Shortened notation
npm run generate:command create-my-name -- -d my-name -f
```

### generate:query
Query generation

<b>Options:</b>

<table>
  <thead>
    <th>#</th>
    <th>Option Name</th>
    <th>Short Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Example</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>String</td>
      <td>Yes</td>
      <td>--name=my-name | -n my-name</td>
      <td>Sets the query name</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>String</td>
      <td>Yes</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Specifies the domain for which to generate the query</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Boolean</td>
      <td>No</td>
      <td>--format=true | -f</td>
      <td>Performs formatting using prettier and eslint</td>
    </tr>
  </tbody>
</table>

To generate a new query for a domain, run the generate:query command with the name, domain, and optional --format arguments:
```bash
npm run generate:query --name=get-one-my-name -- --domain=my-name --format=true
# Shortened notation
npm run generate:query get-one-my-name -- -d my-name -f
```

### generate:event
Event generation

<b>Options:</b>

<table>
  <thead>
    <th>#</th>
    <th>Option Name</th>
    <th>Short Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Example</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>String</td>
      <td>Yes</td>
      <td>--name=my-name | -n my-name</td>
      <td>Sets the event name</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>String</td>
      <td>Yes</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Specifies the domain for which to generate the event</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Boolean</td>
      <td>No</td>
      <td>--format=true | -f</td>
      <td>Performs formatting using prettier and eslint</td>
    </tr>
  </tbody>
</table>

To generate a new event for a domain, run the generate:event command with the name, domain, and optional --format arguments:
```bash
npm run generate:event --name=my-name-created -- --domain=my-name --format=true
# Shortened notation
npm run generate:event my-name-created -- -d my-name -f
```

## Directory Structure

The folder and file structure created by the `generate:domain` command looks like this:
```bash
libs/
  domains/
    src/
      example-domain/
        application-services/
          commands/
            index.ts
          dto/
            index.ts
          events/
            index.ts
          facade/
            example-facade.factory.ts
            example-facade.service.ts
          queries/
            index.ts
        domain/
          services/
            example-domain.service.ts
          example-domain.interface.ts
          example-domain.aggregate.ts
          index.ts
        repositories/
          example-domain-repository.abstract.ts
          index.ts
        sagas/
          example-domain-saga.service.ts
        example-domain.module.ts
        index.ts
    index.ts
src/
  infrastructure/
    example-adapter/
      example-adapter.service
    infrastructure-module.ts
```
- `application-services/commands/` - directory with commands for managing the domain.
- `application-services/dto/` - directory with data transfer objects for use in the application.
- `application-services/events/` - directory with events emitted by the domain.
- `application-services/facade/` - directory with facade classes that provide a simple interface for interacting with the domain.
- `application-services/queries/` - directory with queries for retrieving data from the domain.
- `domain/services/` - directory with domain services that implement business logic.
- `domain/repositories/` - directory with domain repositories that provide access to data.
- `domain/sagas/` - directory with sagas that coordinate complex workflows between domain components.
- `domain/` - directory containing the domain interface, as well as aggregates and other components.
- `example-domain.module.ts` - module that combines all domain components.
- `index.ts` - file exporting all domains from the src/ folder.
- `infrastructure/` - implementation layer
