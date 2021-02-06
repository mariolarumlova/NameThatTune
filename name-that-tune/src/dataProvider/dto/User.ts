import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
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

export class UserModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `users`;
    }

    public update(id: string, value: User): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function userFactory(db: IDatabase) {
    return new UserModel(db);
}