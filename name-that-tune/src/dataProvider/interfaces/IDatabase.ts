import { IContent } from './IContent';

export interface IDatabase {
  getAll: (table: string) => Promise<IContent[]>;
  getById: (id: string, table: string) => IContent;
}