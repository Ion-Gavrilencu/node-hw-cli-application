import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { listContacts, getContactById, addContact, removeContact } from './contacts.js';
import colors from 'colors'; 

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // Listăm contactele doar atunci când acțiunea este "list"
      const contacts = await listContacts();
      if (contacts.length === 0) {
        console.log(colors.yellow('Nu sunt contacte disponibile.'));
      } else {
        console.log(colors.green('Lista de contacte a fost listată cu succes:'));
        console.table(contacts);
      }
      break;

    case 'get':
      // Afișăm contactul căutat doar când se furnizează un ID
      if (!id) {
        console.log(colors.red('Trebuie să furnizezi un ID pentru a găsi contactul.'));
        break;
      }
      const contact = await getContactById(id);
      if (contact) {
        console.log(colors.blue('Contact găsit:'));
        console.table([contact]); // Afișăm doar contactul găsit
      } else {
        console.log(colors.yellow(`Nu există contact cu ID-ul ${id}.`));
      }
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.log(colors.red('Trebuie să furnizezi numele, email-ul și telefonul pentru a adăuga un contact.'));
        break;
      }
      const newContact = await addContact(name, email, phone);
      console.log(colors.green('Contact adăugat cu succes:'));
      console.table([newContact]); // Afișăm doar contactul adăugat
      break;

    case 'remove':
      if (!id) {
        console.log(colors.red('Trebuie să furnizezi un ID pentru a elimina un contact.'));
        break;
      }
      const updatedContacts = await removeContact(id);
      console.log(colors.green('Contact eliminat cu succes.'));
      console.table(updatedContacts); // Afișăm lista actualizată de contacte
      break;

    default:
      console.warn(colors.red('Tip de acțiune necunoscut!'));
  }
}

invokeAction(argv);


