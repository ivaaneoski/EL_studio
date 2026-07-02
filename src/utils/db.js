const DB_NAME = 'ELStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'generations';

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function saveRecord({ blob, text, voiceName, codec, formatValue, logData }) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const record = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      audioBlob: blob,
      text,
      voiceName,
      codec,
      formatValue,
      logData,
    };

    const request = store.add(record);

    request.onsuccess = () => {
      resolve(record);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function getAllRecords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      // Sort newest first
      const sorted = (event.target.result || []).sort((a, b) => b.id - a.id);
      resolve(sorted);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function deleteRecord(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function clearAllRecords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
