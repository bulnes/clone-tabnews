import database from 'infra/database';

async function status(request, response) {
  // const result = await database.query('SELECT 1 + 1 as SUM;');
  // console.log(result.rows);

  const updatedAt = new Date().toISOString();

  // Versao do postgres
  const resultVersion = await database.query('SELECT version() as VERSION;');
  const { version } = resultVersion.rows[0] || { version: '' };

  // Conexões máximas
  const resultMaxConnections = await database.query('SHOW max_connections;');
  const { max_connections } = resultMaxConnections.rows[0] || { max_connections: 0 }

  // Conexões usadas
  const resultUsedConnections = await database.query("SELECT COUNT(*) AS USED_CONNECTIONS FROM pg_stat_activity WHERE state = 'active';");
  const { used_connections } = resultUsedConnections.rows[0] || { used_connections: 0 }

  response.status(200).json({
    updated_at: updatedAt,
    database: {
      version,
      max_connections,
      used_connections
    }
  });
}

export default status;
