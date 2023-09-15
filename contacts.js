const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const readSesult = await fs.readFile(contactsPath);
    const usersList = JSON.parse(readSesult);

    return usersList;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const result = allContacts.find((user) => user.id === contactId);

    return result || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const user = allContacts.findIndex((user) => user.id === contactId);
    const result = allContacts.splice(user, 1);

    if (user === -1) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const user = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
