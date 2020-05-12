const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { dburi } = require('../config');

const databaseURI = dburi;

const db = new Sequelize(databaseURI, {
    logging: false
});

// updatedAt, createdAt - Auto-generated fields
const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  covid19Positive: {
    type: Sequelize.BOOLEAN,
  },
  covid19PositiveDate: {
    type: Sequelize.DATE,
  },
  fingerprintId: {
    type: Sequelize.STRING,
  }
});

// updatedAt, createdAt - Auto-generated fields
// userId, contactId - Fields created by our relationship definition below
// Do we have a need for each entry to have a primary key in this table? We can identify each entry by using the combination of UserId and ContactId
const UserContact = db.define('userContact', {
  contactFrequency: {
    type: Sequelize.INTEGER,
  }
});

User.belongsToMany(User, { as: 'contact', through: 'userContact' });


module.exports = {
  db,
  User,
  UserContact,
};
