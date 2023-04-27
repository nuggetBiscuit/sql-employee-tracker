const mysql12 = require('mysql2');
require('dotenv').config();

const dBase = new mysql12(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);


