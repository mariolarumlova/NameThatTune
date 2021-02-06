import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { IModel } from '../interfaces/IModel';
import { DBResult } from '../interfaces/DBResult';

export interface Settings extends IContent {
    badPartScoring?: string,
    correctAnswerEachPiece?: boolean,
    limitedAnswerTime?: boolean,
    randomStart?: boolean,
    timeLimit?: number,
    ownerId?: string
}

export class SettingsModel implements IModel {
    public table = `settings`;
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

export default function settingsFactory(db: IDatabase) {
    return new SettingsModel(db);
}