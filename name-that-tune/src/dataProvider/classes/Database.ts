import { IDatabase } from '../interfaces/IDatabase';
import { IContent } from '../interfaces/IContent';
import { Filter } from '../interfaces/Filter';
import firebaseDriverFactory from './FirebaseDriver';

export class Database implements IDatabase {
  private driver: IDatabase;

  /**
   * Database
   * @param driver
   */
  constructor(driver: IDatabase) {
    this.driver = driver;
  }

  public getAll(table: string) {
    return this.driver.getAll(table);
  }

  public query(filters: Filter[], table: string) {
    return this.driver.query(filters, table);
  }

  public getById(id: string, table: string) {
    return this.driver.getById(id, table);
  }

  public update(id: string, value: IContent, table: string) {
    return this.driver.update(id, value, table);
  }

  public delete(id: string, table: string) {
    return this.driver.delete(id, table);
  }
}

/**
 * databaseFactory
 * @param driver
 */
export default function databaseFactory() {
  const driver: IDatabase = firebaseDriverFactory();
  return new Database(driver);
}