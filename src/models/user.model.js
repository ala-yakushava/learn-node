import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../db';

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "User's login"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "User's password"
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "User's age"
  },
  timestamps: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  paranoid: true
});
