import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const secretOrKey = process.env.SECRET;
export const NODE_ENV = process.env.NODE_ENV || 'development';

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DEV_DB_NAME
} = process.env;

const databaseCredentials = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DEV_DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '111',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres',
    port : 3001
  }
};

export const { username, password, database, host, dialect } = databaseCredentials[NODE_ENV];
