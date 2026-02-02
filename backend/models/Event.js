const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY },
  time: { type: DataTypes.STRING },
  venue: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  imageUrl: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER }
}, {
  tableName: 'events',
  schema: 'public'
});

module.exports = Event;
