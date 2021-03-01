import { IContent } from './IContent';
import { DBResult } from './DBResult';
import { Filter } from './Filter';

export interface IDatabase {
  getAll: (table: string) => Promise<DBResult>;
  getById: (id: string, table: string) => Promise<DBResult>;
  update: (id: string, value: IContent, table: string) => Promise<DBResult>;
  query: (filters: Filter[], table: string) => Promise<DBResult>;
  delete: (id: string, table: string) => Promise<DBResult>;
}