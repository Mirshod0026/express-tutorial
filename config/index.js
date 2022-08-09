require("dotenv").config();

const application_config = {
  port: process.env.APP_PORT,
};

module.exports = application_config;