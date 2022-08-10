const express = require('express');
const bodyParser = require('body-parser');
require('./Models/index');

const { appConfig } = require('./config/index');
const router = require('./Routes');

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(router);

app.listen(appConfig.port, () =>
  console.log(`Server run on port: ${appConfig.port}`)
);
