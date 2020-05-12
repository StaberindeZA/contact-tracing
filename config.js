const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dburi: process.env.DB_URI
}