import * as process from 'process';

export default () => ({
  port: process.env.PORT,
  db_host: process.env.DB_POSTGRES_HOST,
  db_port: process.env.DB_POSTGRES_PORT,
  db_name: process.env.DB_POSTGRES_DATABASE,
  db_user: process.env.DB_POSTGRES_USER,
  db_password: process.env.DB_POSTGRES_PASSWORD,
});
