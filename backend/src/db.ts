import 'reflect-metadata';
import { createConnection, Connection, getConnectionOptions } from 'typeorm';
export let connection: Connection;

export async function getConnection() {
  if (!connection || !connection.isConnected) {
    const opts = await getConnectionOptions(process.env.NODE_ENV);
    //Change back the db name to default to directly use it
    connection = await createConnection({ ...opts, name: 'default' });
  }
  return connection;
}

export function closeDBConnection() {
  connection && connection.isConnected && connection.close();
}
