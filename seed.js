const { db, User, UserContact } = require('./api/db');

function generateUsers() {
  const users = [];
  users.push(User.build({
    uuid: 'afe72253-34a6-406b-a28b-6d387860f1ef',
    username: 'RuthHill',
    active: true,
    covid19Positive: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  users.push(User.build({
    uuid: '7c80ff5e-6e26-4266-a5b4-0a6e6ff8576c',
    username: 'ReinoMuhl',
    active: true,
    covid19Positive: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  users.push(User.build({
    uuid: 'f94a736c-1d51-4277-8b88-95950bbe6c55',
    username: 'ChurchTheCat',
    active: true,
    covid19Positive: true,
    covid19PositiveDate: '2020-04-29 09:55:00',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  return users;
}


function generateUserContacts(users) {
  const userContacts = [];
  const user1Id = 'afe72253-34a6-406b-a28b-6d387860f1ef';
  const user2Id = '7c80ff5e-6e26-4266-a5b4-0a6e6ff8576c';
  const user3Id = 'f94a736c-1d51-4277-8b88-95950bbe6c55';
  userContacts.push(UserContact.build({
    userUuid: user1Id,
    contactUuid: user2Id,
    contactFrequency: 3,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  userContacts.push(UserContact.build({
    userUuid: user1Id,
    contactUuid: user3Id,
    contactFrequency: 12,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  userContacts.push(UserContact.build({
    userUuid: user2Id,
    contactUuid: user3Id,
    contactFrequency: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  return userContacts;
}


function createUsers() {
  const users = generateUsers();
  let userPromises = users.map(user => user.save());
  return Promise.all(userPromises).then(function() {
      console.log("Users seeded...");
  });
}

function createUserContacts(createdUsers) {
  const contacts = generateUserContacts(createdUsers);
  let contactPromises = contacts.map(contact => contact.save());
  return Promise.all(contactPromises).then(function() {
      console.log("UserContacts seeded...");
  });
}

function seed() {
  return createUsers()
    .then((createdUsers) => {
      return createUserContacts(createdUsers)
    });
}

console.log('Syncing database');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then((result) => console.log('Seeding successful'))
  .catch((err) => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
