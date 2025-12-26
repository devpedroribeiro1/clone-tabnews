import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

const defaultMigrationOptions = {
  dir: resolve("infra", "migrations"),
  dryRun: true,
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

let dbClient;

async function listPendingMigrations() {
  try {
    dbClient = await database.getNewClient();
    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
    };
    const pendingMigrations = await migrationRunner(migrationOptions);

    return pendingMigrations;
  } catch (e) {
    console.log("Erro no catch do getHandler: ");
    console.error(e);
    throw e;
  } finally {
    dbClient.end();
  }
}

async function runPendingMigrations() {
  dbClient = await database.getNewClient();
  try {
    const migrationOptions = {
      ...defaultMigrationOptions,
      dryRun: false,
      dbClient,
    };
    const migratedMigrations = await migrationRunner(migrationOptions);
    return migratedMigrations;
  } catch (e) {
    console.log("Erro no catch do postHandler: ");
    console.error(e);
    throw e;
  } finally {
    dbClient.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
