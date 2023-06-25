// import { openDB } from 'idb';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });



// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {

//   console.error('putDb is implemented');
//   // Open the database and get a transaction
//   const db = await openDB('jate', 1);
//   const tx = db.transaction('jate', 'readwrite');

//   // Put the content into the 'jate' object store
//   const store = tx.objectStore('jate');
//   await store.put(content);

//   // Await the transaction to be completed
//   await tx.done;

// };


// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => {

//   console.error('getDb is implemented');

//   // Open the database
//   const db = await openDB('jate', 1);

//   // Get all content from the 'jate' object store
//   const allContent = await db.getAll('jate');
//   return allContent;

// }

// initdb();

import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate';

const initdb = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(STORE_NAME)) {
        console.log(`${STORE_NAME} database already exists`);
        return;
      }
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      console.log(`${STORE_NAME} database created`);
    },
  });
}

export const putDb = async (content) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put(content);
    await tx.done;
  } catch (error) {
    console.error('Error while adding content to the database: ', error);
  }
}

export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const allContent = await db.getAll(STORE_NAME);
    return allContent;
  } catch (error) {
    console.error('Error while retrieving content from the database: ', error);
  }
}

initdb();
