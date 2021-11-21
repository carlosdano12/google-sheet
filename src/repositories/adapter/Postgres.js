const pgp = require("pg-promise")();

const DEFAULT_CONNECTION_PARAMETERS = {
  connectionTimeoutMillis: 800,
  max: 30,
  idleTimeoutMillis: 3000,
  query_timeout: 2500,
};

const PG_CONECTION_ZONIFICACION = {
  ...DEFAULT_CONNECTION_PARAMETERS,
  host: process.env.POSTGRES_HOST_ZF,
  port: process.env.PG_PORT_ZF ? Number(process.env.PG_PORT_ZF) : 5432,
  user: process.env.POSTGRES_USER_ZF,
  password: process.env.POSTGRES_PASS_ZF,
  database: process.env.POSTGRES_DATABASE_ZF,
};

const PG_CONECTION_GEO = {
  ...DEFAULT_CONNECTION_PARAMETERS,
  host: process.env.POSTGRES_HOST_GEO,
  port: process.env.PG_PORT_GEO ? Number(process.env.PG_PORT_ZF) : 5432,
  user: process.env.POSTGRES_USER_GEO,
  password: process.env.POSTGRES_PASS_GEO,
  database: process.env.POSTGRES_DATABASE_GEO,
};

const zf = pgp(PG_CONECTION_ZONIFICACION);
const geo = pgp(PG_CONECTION_GEO);

module.exports = {
  zf: zf,
  geo: geo,
};
