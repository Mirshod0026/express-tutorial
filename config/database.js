require('dotenv').config();

const dbConfig = {
  MONGO_URL: process.env.MONGO_URL,
};

module.exports = dbConfig;
