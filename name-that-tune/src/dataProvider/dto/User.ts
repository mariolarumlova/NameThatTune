import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { IModel } from '../interfaces/IModel';
import { DBResult } from '../interfaces/DBResult';

export interface User extends IContent {
    name?: string,
    // displayName: string,
    // photoURL: boolean,
    // login: boolean,
    // email: boolean,
    // password: number,
    // schoolId: string,
    // grade: Enum
    // roleId: string
}

export class UserModel implements IModel {
    public table = `users`;
    private db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
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

export default function userFactory(db: IDatabase) {
    return new UserModel(db);
}