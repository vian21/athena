# Athena School Management System

Documentation: https://vian21.github.io/project-0/

## Getting started

### Installation

1. ### Clone the repo

```sh
git clone https://github.com/vian21/athena.git
```

2. ### Install dependencies

```sh
npm install
```

3. ### Setting Environment variables
    Create a file called `.env` in the root folder and set `mysql` configurations.

```js
DATABASE_URL = "mysql://USERNAME:PASSWORD@HOST:3306/DBNAME";
```

Example

```sh
DATABASE_URL = "mysql://root:@localhost:3306/app";
```

This would create a database called `app` using user `root` with password `NONE`(no password) at `localhost`

4. ### Setup database
    We are using Prisma as our ORM(Object Relational Mapper) to provide an abstraction to the database and easy migrations

```sh
npx prisma migrate dev
```

This will create the database you named in your `.env` file.

**That's it! The app is ready to be run**

4. ### Runnig development server

```sh
npm run dev
```

5. Running production server

```
 To be continued ...
```
