import { IDatabase } from '../interfaces/IDatabase';
import { IContent } from '../interfaces/IContent';

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

  public getById(id: string, table: string) {
    return this.driver.getById(id, table);
  }

  public update(id: string, value: IContent, table: string) {
    return this.driver.update(id, value, table);
  }
}

/**
 * databaseFactory
 * @param driver
 */
export default function databaseFactory(driver: IDatabase) {
  return new Database(driver);
}