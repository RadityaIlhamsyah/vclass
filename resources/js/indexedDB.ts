import { Matkul } from './model/Matkul';

const dbName = 'MatkulDB';
const storeName = 'matkulStore';

// Tipe untuk data Matkul

export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result; // Type assertion
            db.createObjectStore(storeName, { keyPath: 'id' }); // Ganti 'id' dengan keyPath yang sesuai
        };

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBRequest).result; // Type assertion
            resolve(db);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
}

export function saveMatkul(matkul: Matkul): Promise<void> {
    return openDatabase().then((db) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(matkul); // Gunakan put untuk menyimpan atau memperbarui data

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
                reject((event.target as IDBRequest).error);
        });
    });
}

export function getMatkul(): Promise<Matkul[]> {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.getAll(); // Mengambil semua data

            request.onsuccess = (event: Event) =>
                resolve((event.target as IDBRequest).result as Matkul[]);
            request.onerror = (event: Event) =>
                reject((event.target as IDBRequest).error);
        });
    });
}

export function removeMatkul(id: number): Promise<void> {
    return openDatabase().then((db) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(id); // Menghapus data berdasarkan ID

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
                reject((event.target as IDBRequest).error);
        });
    });
}

export function clearMatkul(): Promise<void> {
    return openDatabase().then((db) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.clear(); // Menghapus semua data

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = (event: Event) =>
                reject((event.target as IDBRequest).error);
        });
    });
}
