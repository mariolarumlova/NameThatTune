import { db } from "@/repositories/firebase.js";
import { IContent } from "../interfaces/IContent";

import { IDatabase } from "../interfaces/IDatabase";
import { DBResult } from "../interfaces/DBResult";

export class FirebaseDriver implements IDatabase {
  public async getAll(table: string) {
    let result: DBResult = {
      isSuccessful: false,
      totalRecords: 0,
    };
    try {
      const records = await this.getAllPromise(table);
      result = {
        isSuccessful: true,
        totalRecords: records && records.length > 0 ? records.length : 0,
        data: records,
      };
    } catch (err) {
      result.stderr = JSON.stringify(err);
    } 
    return result;
  }

  public getAllPromise(table: string): Promise<IContent[]> {
    return new Promise((resolve, reject) => {
      db.ref(table).once("value")
      .then(snapshot => {
        resolve(snapshot.val());
      })
      .catch(err => {
        reject(err);
      })
    });
  }

  public async getById(id: string, table: string) {
    let result: DBResult = {
      isSuccessful: false,
      totalRecords: 0,
    };
    try {
      const record = await this.getByIdPromise(id, table);
      result = {
        isSuccessful: true,
        totalRecords: record ? 1 : 0,
        data: record,
      };
    } catch (err) {
      result.stderr = JSON.stringify(err);
    } 
    return result;
  }

  public getByIdPromise(id: string, table: string): Promise<IContent> {
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${id}`).once("value")
      .then(snapshot => {
        resolve(snapshot.val());
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  public async update(id: string, value: IContent, table: string) {
    let result: DBResult = {
      isSuccessful: false,
      totalRecords: 0,
    };
    try {
      const updateMessage = await this.updatePromise(id, value, table);
      result = {
        isSuccessful: true,
        totalRecords: 1,
        stdout: updateMessage,
      };
    } catch (err) {
      result.stderr = JSON.stringify(err);
    }
    return result;
  }

  public updatePromise(
    id: string,
    value: IContent,
    table: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${id}`).set(value, (error) => {
        if (error) {
          reject(`Could not update record ${id} in the table ${table}`);
        } else {
          resolve(`Successfully updated record ${id} in the table ${table}`);
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
