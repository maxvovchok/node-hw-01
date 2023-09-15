const users = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await users.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const userId = await users.getContactById(id);
      console.log(userId);
      break;

    case "add":
      const newUser = await users.addContact(name, email, phone);
      console.log(newUser);
      break;

    case "remove":
      const removeUser = await users.removeContact();
      console.log(removeUser);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
