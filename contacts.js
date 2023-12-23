const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
  }
  
async function getContactById(id) {
  const contacts = await listContacts();
   const contact = contacts.find(contact => contact.id === id);
   return contact || null;
   }
  
async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contacts[index];
  }
  
  
 async function addContact(contact) {
    const contacts = await listContacts();
    const newContact = { ...contact, id: crypto.randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;    
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};