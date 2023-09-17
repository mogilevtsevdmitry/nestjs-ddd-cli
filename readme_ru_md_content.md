## Установка
Для установки приложения для генерации структуры папок и файлов для домена в проекте на NestJS вы можете использовать пакет `@webmogilevtsev/nestjs-ddd-cli`. Вы можете установить его с помощью следующей команды:
```bash
npm install @webmogilevtsev/nestjs-ddd-cli --save-dev
```
После установки пакета вам нужно добавить скрипт в файл package.json, чтобы можно было запускать команду `generate:domain`. Добавьте следующую строку в раздел `"scripts"`:
```bash
"scripts": {
  ...
  "generate:domain": "ddd-cli domain --",
  "generate:command": "ddd-cli command",
  "generate:query": "ddd-cli query",
  "generate:event": "ddd-cli event"
}

```

## Глобальная установка
Вы также можете установить `@webmogilevtsev/nestjs-ddd-cli` глобально, чтобы использовать команду `generate-domain` в любом проекте на NestJS. Для этого выполните следующую команду:
```bash
npm install -g @webmogilevtsev/nestjs-ddd-cli
```
После глобальной установки вы можете запускать команду `generate-domain` из любой папки на вашем компьютере:
```bash
generate-domain my-name
```

## Описание

Это приложение для генерации структуры папок и файлов для домена в проекте на NestJS. Команда `generate:domain` генерирует структуру папок и файлов для нового домена, включая следующие каталоги:

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

## Команды

### generate:domain
Генерация домена

<b>Опции:</b>
<table>
  <thead>
    <th>#</th>
    <th>Наименование опции</th>
    <th>Краткое наименование</th>
    <th>Тип</th>
    <th>Обязательное</th>
    <th>Пример</th>
    <th>Описание</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--name=my-name | -n my-name</td>
      <td>Задает имя домена</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Логический</td>
      <td>Нет</td>
      <td>--format=true | -f</td>
      <td>Запускает форматирование с помощью prettier и eslint</td>
    </tr>
  </tbody>
</table>

Чтобы сгенерировать новый домен, необходимо запустить команду `generate:domain` с аргументом `name`, который задает имя домена:
```bash
npm run generate:domain --name=my-name --format=true
# Сокращенная запись
npm run generate:domain my-name -f
```
### generate:command
Генерация команды

<b>Опции:</b>
<table>
  <thead>
    <th>#</th>
    <th>Наименование опции</th>
    <th>Краткое наименование</th>
    <th>Тип</th>
    <th>Обязательное</th>
    <th>Пример</th>
    <th>Описание</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--name=my-name | -n my-name</td>
      <td>Задает имя команды</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Указывается домен для которого необходимого сгенерировать команду</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Логический</td>
      <td>Нет</td>
      <td>--format=true | -f</td>
      <td>Запускает форматирование с помощью prettier и eslint</td>
    </tr>
  </tbody>
</table>

Чтобы сгенерировать новую команду домена, необходимо запустить команду `generate:command` с аргументами `name`, `domain` и необязательным `--format`:
```bash
npm run generate:command --name=create-my-name -- --domain=my-name --format=true
# Сокращенная запись
npm run generate:command create-my-name -- -d my-name -f
```
### generate:query
Генерация запроса

<b>Опции:</b>
<table>
  <thead>
    <th>#</th>
    <th>Наименование опции</th>
    <th>Краткое наименование</th>
    <th>Тип</th>
    <th>Обязательное</th>
    <th>Пример</th>
    <th>Описание</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--name=my-name | -n my-name</td>
      <td>Задает имя запроса</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Указывается домен для которого необходимого сгенерировать запрос</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Логический</td>
      <td>Нет</td>
      <td>--format=true | -f</td>
      <td>Запускает форматирование с помощью prettier и eslint</td>
    </tr>
  </tbody>
</table>

Чтобы сгенерировать новый запрос домена, необходимо запустить команду `generate:query` с аргументами `name`, `domain` и необязательным `--format`:
```bash
npm run generate:query --name=get-one-my-name -- --domain=my-name --format=true
# Сокращенная запись
npm run generate:query get-one-my-name -- -d my-name -f
```
### generate:event
Генерация события

<b>Опции:</b>
<table>
  <thead>
    <th>#</th>
    <th>Наименование опции</th>
    <th>Краткое наименование</th>
    <th>Тип</th>
    <th>Обязательное</th>
    <th>Пример</th>
    <th>Описание</th>
  </thead>
  <tbody>
    <tr>
      <td>1)</td>
      <td>--name</td>
      <td>-n</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--name=my-name | -n my-name</td>
      <td>Задает имя события</td>
    </tr>
    <tr>
      <td>2)</td>
      <td>--domain</td>
      <td>-d</td>
      <td>Строка</td>
      <td>Да</td>
      <td>--domain=my-name | -d my-name</td>
      <td>Указывается домен для которого необходимого сгенерировать событие</td>
    </tr>
    <tr>
      <td>3)</td>
      <td>--format</td>
      <td>-f</td>
      <td>Логический</td>
      <td>Нет</td>
      <td>--format=true | -f</td>
      <td>Запускает форматирование с помощью prettier и eslint</td>
    </tr>
  </tbody>
</table>

Чтобы сгенерировать новое событие домена, необходимо запустить команду `generate:event` с аргументами `name`, `domain` и необязательным `--format`:
```bash
npm run generate:event --name=my-name-created -- --domain=my-name --format=true
# Сокращенная запись
npm run generate:event my-name-created -- -d my-name -f
```

## Структура каталогов

Структура папок и файлов, создаваемая командой `generate:domain`, выглядит следующим образом:
```bash
libs/
  domains/
    src/
      my-name-domain/
        application-services/
          commands/
            index.ts
          dto/
            index.ts
          events/
            index.ts
          facade/
            my-name-facade.factory.ts
            my-name-facade.service.ts
          queries/
            index.ts
        domain/
          services/
            my-name-domain.service.ts
          my-name-domain.interface.ts
          my-name-domain.aggregate.ts
          index.ts
        repositories/
          my-name-domain-repository.abstract.ts
          index.ts
        sagas/
          my-name-domain-saga.service.ts
        my-name-domain.module.ts
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
- `my-name-domain.module.ts` - модуль, объединяющий все компоненты домена.
- `index.ts` - файл, экспортирующий все домены из папки src/.
