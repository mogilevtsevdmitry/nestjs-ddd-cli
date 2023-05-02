# ENGLISH

## Установка
Для установки приложения для генерации структуры папок и файлов для домена в проекте на NestJS вы можете использовать пакет `@webmogilevtsev/nestjs-ddd-cli`. Вы можете установить его с помощью следующей команды:
```bash
npm install @webmogilevtsev/nestjs-ddd-cli --save-dev
```
После установки пакета вам нужно добавить скрипт в файл package.json, чтобы можно было запускать команду `generate:domain`. Добавьте следующую строку в раздел `"scripts"`:
```bash
"scripts": {
  ...
  "generate:domain": "generate-domain"
}

```
Теперь вы можете запускать команду generate:domain с аргументом name, чтобы создать новый домен:
```
npm run generate:domain -- --name=example
```
Аргумент name задает имя нового домена.

## Глобальная установка
Вы также можете установить `@webmogilevtsev/nestjs-ddd-cli` глобально, чтобы использовать команду `generate-domain` в любом проекте на NestJS. Для этого выполните следующую команду:
```bash
npm install -g @webmogilevtsev/nestjs-ddd-cli
```
После глобальной установки вы можете запускать команду `generate-domain` из любой папки на вашем компьютере:
```bash
generate-domain example
```

## Описание

Это приложение для генерации структуры папок и файлов для домена в проекте на NestJS. Команда `generate:domain` генерирует структуру папок и файлов для нового домена, включая следующие каталоги:

- `application-services/commands`
- `application-services/dto`
- `application-services/events`
- `application-services/facade`
- `application-services/queries`
- `domain/services`
- `domain/repositories`
- `domain/sagas`
- `domain`

## Команда

Чтобы сгенерировать новый домен, необходимо запустить команду `generate:domain` с аргументом `name`, который задает имя домена:
```bash
npm run generate:domain -- --name=example
```

Имя домена должно начинаться с маленькой буквы. Если имя домена содержит несколько слов, они должны быть разделены дефисами. Например: `customer-order`.

## Структура каталогов

Структура папок и файлов, создаваемая командой `generate:domain`, выглядит следующим образом:
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
- `application-services/commands/` - каталог с командами для управления доменом.
- `application-services/dto/` - каталог с объектами передачи данных для использования в приложении.
- `application-services/events/` - каталог с событиями, отправляемыми доменом.
- `application-services/facade/` - каталог с классами фасада, которые предоставляют простой интерфейс для взаимодействия с доменом.
- `application-services/queries/` - каталог с запросами для получения данных из домена.
- `domain/services/` - каталог с сервисами домена, которые реализуют бизнес-логику.
- `domain/repositories/` - каталог с репозиториями домена, которые осуществляют доступ к данным.
- `domain/sagas/` - каталог с сагами, которые координируют сложные потоки работы между компонентами домена.
- `domain/` - каталог, содержащий интерфейс домена, а также агрегаты и другие компоненты.
- `example-domain.module.ts` - модуль, объединяющий все компоненты домена.
- `index.ts` - файл, экспортирующий все домены из папки src/.

## Использование

После того, как вы создали новый домен с помощью команды `generate:domain`, вы можете начать работать с его компонентами. Обычно вы будете добавлять новые методы в сервисы домена, настраивать репозитории и создавать новые агрегаты.

## Заключение
В этом руководстве мы рассмотрели, как создать приложение на NestJS для генерации структуры папок и файлов для нового домена. Мы написали команду `generate:domain`, которая создает все необходимые каталоги и файлы для нового домена, а также обновляет файл `libs/domains/src/index.ts` для добавления экспорта нового домена.