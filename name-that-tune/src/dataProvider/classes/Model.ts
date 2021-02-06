import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { IModel } from '../interfaces/IModel';
import { DBResult } from '../interfaces/DBResult';

export class Model implements IModel {
    public table: string;
    protected db: IDatabase;

    constructor(db: IDatabase, table = '') {
        this.db = db;
        this.table = table;
    }

    public async getAll(): Promise<DBResult> {
        return this.db.getAll(this.table);
    }

    public getById(id: string): Promise<DBResult> {
        return this.db.getById(id, this.table);
    }

    public update(id: string, value: IContent): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}