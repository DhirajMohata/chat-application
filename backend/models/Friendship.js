const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Friendship = sequelize.define('Relationship', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  friendName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastSeenAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastMessage: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'No messages yet',
  },
  status: {
    type: DataTypes.ENUM('blocked', 'all', 'archived'),
    allowNull: true,
    defaultValue: 'all',
  },
});

// Associations
User.hasMany(Friendship, { as: 'Relationship', foreignKey: 'userId' });
Friendship.belongsTo(User, { as: 'User', foreignKey: 'userId' });
Friendship.belongsTo(User, { as: 'Friend', foreignKey: 'friendId' });

module.exports = Friendship;
