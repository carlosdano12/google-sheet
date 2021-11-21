const pgp = require("pg-promise")();

const PG_CONECTION = {
  host: process.env.POSTGRES_HOST,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DATABASE,
  connectionTimeoutMillis: 1000,
  max: 25,
  idleTimeoutMillis: 2000,
  query_timeout: 3500,
};

const zf = pgp(PG_CONECTION);
