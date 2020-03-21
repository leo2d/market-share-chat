import { createConnection, Connection } from 'typeorm';
import DbConfig from '../../constants/types/dbConfig';
import User from '../../domain/user/user';

export async function getDbConnection({
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
}: DbConfig): Promise<Connection> {
  const entities = [User];

  const conn = await createConnection({
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: entities,
    synchronize: true,
  });

  return conn;
}
