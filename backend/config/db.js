const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,   // ✅ 172.21.160.1
    port: process.env.DB_PORT,   // ✅ 5439
    dialect: 'postgres',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ DB connection error:', err));

module.exports = sequelize;
