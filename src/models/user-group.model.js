import { DataTypes, Op } from 'sequelize';

import { sequelize } from '../db';
import { User, Group } from '.';

export const UserGroup = sequelize.define('UserGroup', {
  UserId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  GroupId: {
    type: DataTypes.UUID,
    references: {
      model: Group,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
