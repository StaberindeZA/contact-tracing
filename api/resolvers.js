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
    users: [User]
    getUserById(id: ID!): User!
    getUserByUsername(username: String!): User!
    getUserContacts(userId: ID!): [UserContact]
    getUserContactedBy(userId: ID!): [UserContact]
  }

  type Mutation {
    createUser(username: String!): String
    updateUserActive(id: ID!, active: Boolean): Boolean
    updateUserFingerprint(id: ID!, fingerprintId: String): String
    updateUserCovidStatus(id: ID!, covid19Positive: Boolean!, covid19PositiveDate: String): Boolean
    deleteUser(id: ID!): Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  users: () => User.findAll().then(users => users),
  getUserById: (args) => User.findByPk(args.id),
  getUserByUsername: (args) => User.findOne({where: {username: args.username}}),
  getUserContacts: (args) => UserContact.findAll({where: {userUuid: args.userId}}).then(contacts => contacts),
  getUserContactedBy: (args) => UserContact.findAll({where: {contactUuid: args.userId}}).then(contacts => contacts),
  createUser: (args) => User.create({username: args.username, active: true}).then(data => data.uuid),
  updateUserActive: (args) => User.update({active: args.active}, {where: {uuid: args.id}, returning: true}).then(data => data[1][0].active),
  updateUserFingerprint: (args) => User.update({fingerprintId: args.fingerprintId}, {where: {uuid: args.id}, returning: true}).then(data => data[1][0].fingerprintId),
  updateUserCovidStatus: (args) => User.update({covid19Positive: args.covid19Positive, covid19PositiveDate: args.covid19PositiveDate}, {where: {uuid: args.id}, returning: true}).then(data => data[1][0].covid19Positive),
  deleteUser: (args) => User.destroy({where: {uuid: args.id}})  // use case: users could opt to be fully deleted after 2 weeks of being classified as inactive, as all records of contacts made would no longer be relevant/would themselves be deleted
};


module.exports = {
  schema,
  root
}
