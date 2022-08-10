const mongoose = require('mongoose');

const { dbConfig } = require('../config/index');

mongoose
  .connect(dbConfig.MONGO_URL)
  .then(() => console.log(`Mongo connected`))
  .catch((e) => console.log(`Mongo error:`, e));
