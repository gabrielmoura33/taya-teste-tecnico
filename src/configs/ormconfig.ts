import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite3',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
};
export default new DataSource(dataSourceOptions);
