import database from "infra/database.js";

async function status(request, response) {
  const fakesecret = "AKIAABCDEFGHIJKLMNOP";
  console.log(fakesecret);

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

export default status;
