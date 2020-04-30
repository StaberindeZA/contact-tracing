const express = require('express');
// const fs = require('fs');
// const sqlite = require('sql.js');

// const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

// const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 3001));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.json({ body: "This is the body text" });
});

export default app;
