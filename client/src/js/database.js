import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  console.error('putDb is implemented');
  // Open the database and get a transaction
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');

  // Put the content into the 'jate' object store
  const store = tx.objectStore('jate');
  await store.put(content);

  // Await the transaction to be completed
  await tx.done;

};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.error('getDb is implemented');

  // Open the database
  const db = await openDB('jate', 1);

  // Get all content from the 'jate' object store
  const allContent = await db.getAll('jate');
  return allContent;

}

initdb();
