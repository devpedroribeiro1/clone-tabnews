import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import db from "infra/database.js";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

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
export default router.handler({
  onError: (error, request, response) => {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("Erro dentro do catch do controller: ");
    console.error(publicErrorObject);
    response.status(500).json(publicErrorObject);
  },
  onNoMatch: (request, response) => {
    const publicErrorObject = new MethodNotAllowedError();
    response.status(405).json(publicErrorObject);
  },
});

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
