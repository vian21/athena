# Athena School Management System

Documentation: https://vian21.github.io/project-0/

## Getting started

### Installation

### 1. Clone the repo

```sh
git clone https://github.com/vian21/athena.git
cd athena
```

### 2. Install dependencies

```sh
npm install
```

### 3. Setting Environment variables

you can use the .env.example file as a template for your own .env file

```sh
cp .env.example .env
```

### 4. Setup docker containers

We are using docker to run our database and admin interface(adminer)

```sh
docker compose up -d
```

### 5. Setup database

    We are using Prisma as our ORM(Object Relational Mapper) to provide an abstraction to the database and easy migrations

```sh
npx prisma migrate dev --name init
```

This will connect to the database you named in your `.env` file and seed it.

**That's it! The app is ready to be run**

## Runnig development server

start database container and adminer

```sh
docker compose up -d
```

```sh
npm run dev
```

## Running production server

```
 To be continued ...
```
