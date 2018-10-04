# Backend server for EdTech.top

## Getting started

1. Clone this repo to your local environment.
2. Run `npm i` command to install all dependencies
3. Install [PostgreSQL](https://www.postgresql.org/download/)
4. Create a file named  `ormconfig.json` in the root, follow this structure to change the config accordingly.
```json
[
    {
      "name": "development",
      "type": "postgres",
      "host": ,
      "port": ,
      "username": ,
      "password": ,
      "database": ,
      "synchronize": true,
      "logging": true,
      "entities": ["src/entity/**/*.ts"],
      "migrations": ["src/migration/**/*.ts"],
      "subscribers": ["src/subscriber/**/*.ts"],
      "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
      }
    },
    {
      "name": "test",
      "type": "postgres",
      "host": ,
      "port": ,
      "username": ,
      "password": ,
      "database": ,
      "synchronize": true,
      "logging": false,
      "dropSchema": true,
      "entities": ["src/entity/**/*.ts"],
      "migrations": ["src/migration/**/*.ts"],
      "subscribers": ["src/subscriber/**/*.ts"],
      "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
      }
    }
]
```
5. Create a file named `.env` in the root, you need to add **JWT_SECRET** and **API_VERSION** variables.
6. Run `npm start` command to start the server.

## Running unit test
Run `npm test` to run unit tests.

## Generate api docs
Run `npm doc` to generate api documentaion based on the comments before api function. A webpage will be generated in ./doc/