import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default class DatabaseConnection {

  static connect(synchronize?: boolean): Promise<Connection> {
    return createConnection({
      synchronize,
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [
        'src/entities/*.js',
        'src/entities/*.ts',
      ],
      logging: synchronize ? ['error', 'query'] : [],
      dropSchema: synchronize,
    });
  }

  static printConnectionInfo(options: PostgresConnectionOptions) {
    console.log('Connected to database:');
    console.log(`${options.type}://${options.username}:${options.password}@${options.host}:${options.port}/${options.database}`);
  }
}
