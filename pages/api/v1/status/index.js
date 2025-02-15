import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date()
  const serverVersion = await database.query('SHOW server_version');
  const maxConnections = await database.query('SHOW max_connections')
  const currentConnections = await database.query('SELECT COUNT(*) FROM pg_stat_activity;')

  response.status(200).json({
    updated_at: updatedAt,
    database_info: {
      server_version: serverVersion.rows[0].server_version,
      max_connections: maxConnections.rows[0].max_connections,
      current_connections: currentConnections.rows[0].count
    }
  });
}

export default status;
