import * as typeORM from 'typeorm';

import DbConfig from '../../constants/types/dbConfig';
import User from '../../domain/user/user';

export async function createDBConnection(
  dbConfig: DbConfig
): Promise<typeORM.Connection> {
  const entities = [User];

  const connectionOptions: typeORM.ConnectionOptions = {
    type: 'postgres',
    entities,
    synchronize: true,
    ...dbConfig,
  };

  try {
    const conn = await typeORM.createConnection(connectionOptions);

    console.log('Database: Successfully connected');

    return conn;
  } catch (error) {
    console.error(`Database: Error when trying to connect:`, error);

    throw error;
  }
}
