import { IContent } from './IContent';
import { DBResult } from './DBResult';

export interface IDatabase {
  getAll: (table: string) => Promise<DBResult>;
  getById: (id: string, table: string) => Promise<DBResult>;
  update: (id: string, value: IContent, table: string) => Promise<DBResult>;
}