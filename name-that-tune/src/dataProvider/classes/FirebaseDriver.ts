import { db } from "@/repositories/firebase.js";
import { IContent } from "../interfaces/IContent";
import { IDatabase } from "../interfaces/IDatabase";
import { DBResult } from "../interfaces/DBResult";
import { Filter } from "../interfaces/Filter";

export class FirebaseDriver implements IDatabase {
  public async getAll(table: string) {
    let result: DBResult = {
      isSuccessful: false,
      totalRecords: 0,
    };
    try {
      const records = await this.getAllPromise(table);
      const ids = Object.keys(records);
      result = {
        isSuccessful: true,
        totalRecords: ids && ids.length > 0 ? ids.length : 0,
        data: Object.values(records),
      };
    } catch (err) {
      console.error(err);
      result.stderr = JSON.stringify(err, Object.getOwnPropertyNames(err));
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

  public async query(filters: Filter[], table: string) {
    let result: DBResult = {
      isSuccessful: false,
      totalRecords: 0,
    };
    try {
      const records = await this.queryPromise(filters, table);
      const ids = records ? Object.keys(records) : [];
      result = {
        isSuccessful: true,
        totalRecords: ids.length > 0 ? ids.length : 0,
        data: Object.values(records),
      };
    } catch (err) {
      console.error(err);
      result.stderr = JSON.stringify(err, Object.getOwnPropertyNames(err));
    } 
    return result;
  }

  public queryPromise(filters: Filter[], table: string): Promise<IContent[]> {
    return new Promise((resolve, reject) => {
      let ref = db.ref(table);
      ref = filters && filters.length ? ref.orderByChild(filters[0].key).equalTo(filters[0].value) : ref;
      ref.once("value")
      .then(snapshot => {
        const areFilters = filters && filters.length;
        const resultFiltered = areFilters
        ? Object.keys(snapshot.val())
          .reduce( (acc, key) => {
            const matchesFilters = filters.every(filter => snapshot.val()[key][filter.key] === filter.value);
            return matchesFilters ? {...acc, [key]: snapshot.val()[key]} : acc;
          }, {})
        : snapshot.val();
        resolve(resultFiltered);
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
      console.error(err);
      result.stderr = JSON.stringify(err, Object.getOwnPropertyNames(err));
    } 
    return result;
  }

  public async getValueOfObject(id: string, table: string, value: IContent): Promise<IContent> {
    const existingRecord = await this.getByIdPromise(id, table) || {};
    return { ...existingRecord, ...value };
  }

  public async getByIdPromise(id: string, table: string): Promise<IContent> {
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
      console.error(err);
      result.stderr = JSON.stringify(err, Object.getOwnPropertyNames(err));
    }
    return result;
  }

  public async updatePromise(
    id: string,
    value: IContent,
    table: string
  ): Promise<string> {
    const upsertValue = await this.getValueOfObject(id, table, value);
    return new Promise((resolve, reject) => {
      db.ref(`${table}/${id}`).set(upsertValue, (error) => {
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
