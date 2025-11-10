import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

const router = createRouter();

router.get(getHandler);

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
    console.log("see here: ", JSON.stringify(publicErrorObject));
    response.status(405).json(publicErrorObject);
  },
});

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionQueryResult = await database.query(
    "SHOW server_version",
  );
  const databaseVersionValue =
    databaseVersionQueryResult.rows[0].server_version;

  const databaseMaxConnectionsQueryResult = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsQueryResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsQueryResult = await database.query({
    text: `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsQueryResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        server_version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
