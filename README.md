# Lockealo - Password Manager API

Lockealo is a secure and simple password manager API built with Node.js and TypeScript. It allows users to securely store and manage their passwords. This repository contains only the API, and a frontend client will also be available to interact with the API.

## Features

- Secure password storage using encryption.
- User authentication via JWT tokens.
- Sequelize ORM for PostgreSQL database interactions.
- Migrations and seeders for database management.

## Technologies

- **Node.js** (with TypeScript)
- **Sequelize** (for PostgreSQL database ORM)
- **Bcrypt** (for password encryption)
- **Jose** (for JWT token generation)
- **PostgreSQL** (for the database)
- **Express** (for the server)

## Setup

Follow these steps to get the project up and running.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd lockealo-api
```

### 2. Install Dependencies

You can use `npm`, `pnpm`, or `yarn` to install the dependencies:

**Using npm:**

```bash
npm install
```

**Using pnpm:**

```bash
pnpm install
```

**Using yarn:**

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file from the `.env.example` file.

```bash
cp .env.example .env
```

Edit the `.env` file with your database and server configurations.

Example `.env`:

```bash
NODE_ENV=development
PORT=3000
```

### 4. Compile TypeScript

To compile TypeScript, run:

```bash
npm run build
```

This will create the `dist` folder containing the compiled JavaScript files.

### 5. Run the Server

To run the server in development mode with live reload, use:

```bash
npm run dev
```

To start the production server, build the project and then run:

```bash
npm run start
```

The server will run on port `3000` (or whatever you specify in the `.env` file).

### 6. Database Setup

Use Sequelize CLI to manage migrations and seeders.

**To generate a new migration:**

```bash
npm run migrate:generate --name <migration_name>
```

**To run migrations:**

```bash
npm run migrate:up
```

**To run specific migration:**

```bash
npm run migrate:up:to <migration_name>
```

**To undo the most recent migration:**

```bash
npm run migrate:undo:recent
```

**To undo a specific migration:**

```bash
npm run migrate:undo:to <migration_name>
```

**To undo all migrations:**

```bash
npm run migrate:undo
```

**To generate new seed data:**

```bash
npm run seed:generate --name <seed_name>
```

**To run seeders:**

```bash
npm run seed:up
```

**To run specific seeder:**

```bash
npm run seed:up:to <seed_name>
```

**To undo the most recent seed data:**

```bash
npm run seed:undo:recent
```

**To undo a specific seed data:**

```bash
npm run seed:undo:to <seed_name>
```

**To undo all seed data:**

```bash
npm run seed:undo
```
