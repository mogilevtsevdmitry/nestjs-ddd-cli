## Installation
To install the application for generating folder and file structure for a domain in a NestJS project, you can use the `@webmogilevtsev/nestjs-ddd-cli` package. You can install it using the following command:
```bash
npm install @webmogilevtsev/nestjs-ddd-cli --save-dev
```
After installing the package, you need to add a script to the package.json file so that you can run the `generate:domain` command. Add the following line to the `"scripts"` section:
`"scripts"`:
```bash
"scripts": {
  ...
  "generate:domain": "ddd-cli domain --",
  "generate:command": "ddd-cli command"
}

```
Now you can run the generate:domain command with the name argument to create a new domain:
```
npm run generate:domain --name=<domain-name>
```
The name argument sets the name of the new domain.

To create a command, type:
```
npm run generate:command <command-name> --domain=<domain-name>
```
The domain argument specifies which domain to create the command for.

## Global installation
You can also install `@webmogilevtsev/nestjs-ddd-cli` globally to use the `generate-domain` command in any NestJS project. To do this, run the following command:
```bash
npm install -g @webmogilevtsev/nestjs-ddd-cli
```
After global installation, you can run the generate-domain command from any folder on your computer:
```bash
generate-domain example
```

## Description

This is an application for generating folder and file structure for a domain in a NestJS project. The `generate:domain` command generates the folder and file structure for a new domain, including the following directories:

- `application-services/commands`
- `application-services/dto`
- `application-services/events`
- `application-services/facade`
- `application-services/queries`
- `domain/services`
- `domain/repositories`
- `domain/sagas`
- `domain`

## Command

To generate a new domain, you need to run the `generate:domain` command with the `name` argument, which sets the domain name:
```bash
npm run generate:domain -- --name=example
```

The domain name must start with a small letter. If the domain name contains multiple words, they must be separated by hyphens. For example: `customer-order`.

To generate a new command, you need to run the `generate:command` command with a `name` argument that specifies the name of the command and a `domain` argument to specify which domain the command belongs to:
```bash
npm run generate:command --name=example -- --domain=example
# Abbreviated notation
npm run generate:command example -- -d example
```

The domain name should start with a lowercase letter. If the domain name contains multiple words, they should be separated by hyphens. For example: `customer-order`.

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

## Usage
After you have created a new domain using the `generate:domain` command, you can start working with its components. Typically, you will be adding new methods to domain services, configuring repositories, and creating new aggregates.

## Conclusion
In this guide, we have looked at how to create a NestJS application for generating folder and file structure for a new domain. We wrote the `generate:domain` command, which creates all necessary directories and files for a new domain, as well as updates the `libs/domains/src/index.ts` file to add the export of the new domain.