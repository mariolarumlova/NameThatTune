import { db } from "@/repositories/firebase.js";
import { IContent } from "../interfaces/IContent";

import { IDatabase } from '../interfaces/IDatabase';

export class FirebaseDriver implements IDatabase {

  public getAll(table: string) {
    return this.getAllPromise(table);
  }
    
  public getAllPromise(table: string): Promise<IContent[]> {
    return new Promise((resolve, reject) => {
      db.ref(table).on('value', (snapshot) => {
        console.log(JSON.stringify(snapshot.val()));
        resolve(snapshot.val());
      });
    });
  }

  public getById(id: string, table: string) {
    return db.ref(`${table}/${id}`).on('value', (snapshot) => {
        return snapshot.val();
    });
  }

}

/**
 * firebaseDriverFactory
 * @param extractor
 * @param cwd
 */
export default function firebaseDriverFactory() {
  return new FirebaseDriver();
}