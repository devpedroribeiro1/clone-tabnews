import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';
import db from 'infra/database.js';

export default async function migrations(request, response) {
  const dbClient = await db.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dir: join('infra', 'migrations'),
    dryRun: true,
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations'
  }

  if (request.method === 'GET') {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    dbClient.end();

    response.status(200).json(pendingMigrations);
  }

  if (request.method === 'POST') {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false
    });
    dbClient.end();    

    if(migratedMigrations.length > 0){
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).json({message: "retornando mensagem de erro caso não seja get nem post"})
}
