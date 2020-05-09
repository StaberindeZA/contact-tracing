const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
// const fs = require('fs');

const { schema, root } = require('./api/resolvers');

// Run the GraphQL query '{ test }' and print out the response
// We can remove the 'test' query and this function call at any point - it's just for familiarization with GraphQL :)
graphql(schema, '{ test }', root).then((response) => {
  console.log(response);
});

const app = express();

// To support parsing of json and x-www-form-urlencoded POST data in response bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // visit http://localhost:3001/graphql to use this tool
}));

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

module.exports = app;
