import * as idb from 'idb';

const DATABASE_NAME = 'LI_Local_DB';
const DATABASE_VERSION = 2;
const OBJECT_STORE_NAME = 'LI_Local_DB_Store';

const dbPromise = idb.openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
        switch (oldVersion) {
            case 0:
            case 1:
                db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
                const tx = transaction.objectStore(OBJECT_STORE_NAME);
                tx.createIndex('id', 'id', { unique: true });
                tx.createIndex('value', 'value', { unique: false });
        }
    }
});

class DBWrapper {
    get(key: string) {
        return dbPromise.then(db => {
            return db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME).get(key);
        }).catch(error => {
            console.error(error);
        });
    }

    put(key: string, value: string) {
        return dbPromise.then(db => {
            return db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME).put({ id: key, value: value });
        }).catch(error => {
            console.error(error);
        });
    }

    delete(key: string) {
        return dbPromise.then(db => {
            return db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME).delete(key);
        }).catch(error => {
            console.error(error);
        });
    }

    clear() {
        return dbPromise.then(db => {
            return db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME).clear();
        }).catch(error => {
            console.error(error);
        });
    }
}

const dbWrapper = new DBWrapper()
export default dbWrapper;
