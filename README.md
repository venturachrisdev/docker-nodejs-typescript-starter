# Docker, NodeJS/Typescript and TypeORM Starter

## Features
* Docker
* NodeJS
* Typescript
* TypeORM (with Postgres)
* Clean Architecture

## Getting Started

Run in development:

```sh
$ yarn watch-debug
```

with docker:

```sh
$ docker-compose up -d
```

Run in production:
```sh
$ run.sh
```
or 
```sh
$ yarn build
$ yarn serve
```

Run linter:
```sh
$ yarn tslint
```

Run tests:
```sh
$ yarn test
```

Run TypeORM migrations:
```sh
$ yarn migrate
```
