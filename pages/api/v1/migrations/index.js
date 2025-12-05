import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import db from "infra/database.js";
import { createRouter } from "next-connect";

const defaultMigrationOptions = {
  dir: resolve("infra", "migrations"),
  dryRun: true,
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};
let dbClient;

const router = createRouter();
router.get(getHandler);
router.post(postHandler);
export default router.handler();

async function postHandler(request, response) {
  dbClient = await db.getNewClient();
  try {
    const migrationOptions = {
      ...defaultMigrationOptions,
      dryRun: false,
      dbClient,
    };
    const migratedMigrations = await migrationRunner(migrationOptions);

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } catch (e) {
    console.log("Erro no catch do postHandler: ");
    console.error(e);
    throw e;
  } finally {
    dbClient.end();
  }
}

async function getHandler(request, response) {
  try {
    dbClient = await db.getNewClient();
    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
    };
    const pendingMigrations = await migrationRunner(migrationOptions);

    return response.status(200).json(pendingMigrations);
  } catch (e) {
    console.log("Erro no catch do getHandler: ");
    console.error(e);
    throw e;
  } finally {
    dbClient.end();
  }
}
