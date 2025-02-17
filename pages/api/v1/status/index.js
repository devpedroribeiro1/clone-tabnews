import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date()

  const serverVersionQueryResult = await database.query('SHOW server_version');
  const serverVersionValue = serverVersionQueryResult.rows[0].server_version;

  const maxConnectionsQueryResult = await database.query('SHOW max_connections');
  const maxConnectionsValue = maxConnectionsQueryResult.rows[0].max_connections;

  const currentConnectionsQueryResult = await database.query('SELECT COUNT(*) FROM pg_stat_activity;')
  const currentConnectionsValue = currentConnectionsQueryResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    database_info: {
      server_version: serverVersionValue,
      max_connections: maxConnectionsValue,
      current_connections: currentConnectionsValue
    }
  });
}

export default status;
