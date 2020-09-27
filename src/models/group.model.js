import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../db';

export const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Group's name"
  },
  permission: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    comment: "Group's permission"
  },
  timestamps: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});
