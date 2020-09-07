import Sequelize from 'sequelize';
import { username, password, database, host, dialect } from './config';

export const sequelize = new Sequelize(database, username, password, {
  dialect, host
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const sync = async () => {
  try {
    await sequelize.sync();
    console.log('Sync all defined models to the DB.');
  } catch (error) {
    console.error('Sync error: ', error);
  }
};
