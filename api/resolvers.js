const { buildSchema } = require('graphql');

const { User, UserContact } = require('./db');

// The schema declares how the data that we are accessing are structured, their data types & whether they are required (User and UserContact),
// and also how our requests will be formatted (Query == GET and Mutation == PUT, POST, DELETE, etc.)
// NOTE: GraphQL has no Date type
const schema = buildSchema(`
  type User {
    id: ID!
    active: Boolean
    username: String
    covid19Positive: Boolean
    covid19PositiveDate: String
    fingerprintId: String
    updatedAt: String
    createdAt: String
  }

  type UserContact {
    userId: ID!
    contactId: ID!
    createdAt: String
    updatedAt: String
    contactFrequency: String
  }

  type Query {
    test: String
    users: [User]
    getUserById(id: ID!): User!
    getUserByUsername(username: String!): User!
    getUserContacts(userId: ID!): [UserContact]
    getUserContactedBy(userId: ID!): [UserContact]
  }

  type Mutation {
    createUser(username: String!, fingerprintId: String) : Boolean
    updateUserInfo(id: ID!, active: Boolean, fingerprintId: String,) : Boolean
    updateUserCovidStatus(id: ID!, covid19Positive: Boolean!, covid19PositiveDate: String) : Boolean
    deleteUser(id: ID!) : Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  test: () => "This is the correct response for a 'test' query.",
  users: () => User.findAll().then(users => users),
  getUserById: (args) => User.findByPk(args.id),
  getUserByUsername: (args) => User.findOne({where: {username: args.username}}),
  getUserContacts: (args) => UserContact.findAll({where: {userId: args.userId}}).then(contacts => contacts),
  getUserContactedBy: (args) => UserContact.findAll({where: {contactId: args.userId}}).then(contacts => contacts),
  // createUser: (args) => User.create({username: args.username}).then(data => data)
};


module.exports = {
  schema,
  root
}
