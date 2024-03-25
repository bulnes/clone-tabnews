import database from 'infra/database';

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Versao do postgres
  const resultVersion = await database.query('SHOW server_version;');
  const { server_version } = resultVersion.rows[0] || { server_version: '' };

  // Conexões máximas
  const resultMaxConnections = await database.query('SHOW max_connections;');
  const { max_connections } = resultMaxConnections.rows[0] || { max_connections: 0 }

  // Conexões usadas
  const resultUsedConnections = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_postgres';");
  const opened_connections = resultUsedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: server_version,
        max_connections: parseInt(max_connections),
        opened_connections
      }
    },
  });
}

export default status;
