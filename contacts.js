import fs from 'fs/promises';
import path from 'path';
import colors from 'colors';
import { randomUUID } from "node:crypto";

// Calea către fișierul contacts.json
const contactsPath = path.resolve('db', 'contacts.json');



// Funcție pentru a lista toate contactele
export async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(data);
      return contacts || [];
    } catch (error) {
      console.error(colors.red('Eroare la citirea fișierului de contacte:'), error);
      return [];
    }
  }
// Funcție pentru a găsi un contact după ID
export async function getContactById(id) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === id);
  }

// Funcție pentru a adăuga un contact nou
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: randomUUID(), name, email, phone }; // Folosim randomUUID pentru un ID unic
    contacts.push(newContact);
    try {
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    } catch (error) {
      console.error(colors.red('Eroare la salvarea contactului:'), error);
    }
  }

// Funcție pentru a elimina un contact
export async function removeContact(contactId) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    try {
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
      return filteredContacts;
    } catch (error) {
      console.error(colors.red('Eroare la eliminarea contactului:'), error);
    }
  }