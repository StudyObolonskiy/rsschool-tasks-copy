export class DataBase {
  public dB = window.indexedDB;

  public database: IDBDatabase | null = null;

  public playersArr: IDBCursorWithValue | null = null;

  public init(): void {
    const openRequest = this.dB.open('StudyObolonskiy');
    openRequest.onupgradeneeded = () => {
      this.database = openRequest.result;
      const store = this.database.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      store.createIndex('firstName', 'firstName');
      store.createIndex('lastName', 'lastName');
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('score', 'score');
      store.createIndex('avatar', 'avatar');
      store.add({
        firstName: 'John',
        lastName: 'Smith',
        email: 'j.s@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'k.j@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Adam',
        lastName: 'Williams',
        email: 'a.w@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Ben',
        lastName: 'Jones',
        email: 'b.j@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Andrew',
        lastName: 'Brown',
        email: 'a.b@example.com',
        score: 200,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Samuel',
        lastName: 'Davis',
        email: 's.d@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Fred',
        lastName: 'Miller',
        email: 'f.m@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Martin',
        lastName: 'Wilson',
        email: 'm.w@example.com',
        score: 150,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Gordon',
        lastName: 'Moore',
        email: 'g.m@example.com',
        score: 170,
        avatar: './images/animals/28.png',
      });
      store.add({
        firstName: 'Bill',
        lastName: 'Taylor',
        email: 'b.t@example.com',
        score: 1700,
        avatar: './images/animals/28.png',
      });
    };
    openRequest.onsuccess = () => {
      this.database = openRequest.result;
    };
  }

  getUsers(): void {
    if (this.database) {
      const transaction = this.database.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const collection = store.index('score').openCursor(null, 'prev');
      collection.onsuccess = () => {
        const cursor = collection.result;
        if (cursor) {
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        this.playersArr = collection.result;
      };
    }
  }
}
export const myBase = new DataBase();
