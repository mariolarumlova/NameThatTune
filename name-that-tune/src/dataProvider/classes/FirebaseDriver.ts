import { db } from "@/repositories/firebase.js";
import { IContent } from "../interfaces/IContent";

import { IDatabase } from '../interfaces/IDatabase';

export class FirebaseDriver implements IDatabase {

  public getAll(table: string) {
    return this.getAllPromise(table);
  }
    
  public getAllPromise(table: string): Promise<IContent[]> {
    return new Promise((resolve, reject) => {
      db.ref(table)
      .on('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });
  }

  public getById(id: string, table: string): Promise<IContent> {
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${id}`)
      .on('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });
  }

  public update(id: string, value: IContent, table: string): Promise<string> {
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${id}`)
      .set(value,
        error => {
          if (error) {
            resolve(`Successfully updated record ${id} in the table ${table}`);
          } else {
            reject(`Could not update record ${id} in the table ${table}`);
          }
        });
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