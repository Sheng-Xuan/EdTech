import 'reflect-metadata';
import { createConnection, Connection, getConnectionOptions, getRepository } from 'typeorm';
export let connection: Connection;

export async function getConnection() {
  if (!connection || !connection.isConnected) {
    if (process.env.CI_TEST == 'true') {
      // The config on ci is using environment variables, no names required
      connection = await createConnection();
    } else {
      const opts = await getConnectionOptions(process.env.NODE_ENV);
      // Change back the db name to default to directly use it
      connection = await createConnection({ ...opts, name: 'default' });
    }
  }
  return connection;
}

export function closeDBConnection() {
  connection && connection.isConnected && connection.close();
}