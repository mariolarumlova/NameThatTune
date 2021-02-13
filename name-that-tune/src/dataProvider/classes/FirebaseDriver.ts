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

  public async getIndexOfObject(id: string, records: IContent[]): Promise<number> {
    let index = 0;
    if (records && records.length) {
      const record = records.find(el => el.id === id);
      index = record ? records.indexOf(record) : -1;
      index = index === -1 ? records.length : index;
    }
    return index;
  }

  public async getValueOfObject(id: string, value: IContent, records: IContent[]): Promise<IContent> {
    const existingRecord = records && records.length ? records.find(el => el.id === id) : {};
    return { ...existingRecord, ...value };
  }

  public async getByIdPromise(id: string, table: string): Promise<IContent> {
    const records = await this.getAllPromise(table);
    const index = await this.getIndexOfObject(id, records);
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${index}`).once("value")
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

  public async updatePromise(
    id: string,
    value: IContent,
    table: string
  ): Promise<string> {
    const records = await this.getAllPromise(table);
    const index = await this.getIndexOfObject(id, records);
    const upsertValue = await this.getValueOfObject(id, value, records);
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${index}`).set(upsertValue, (error) => {
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
