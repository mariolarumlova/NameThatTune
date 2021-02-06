import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

export interface Settings extends IContent {
    badPartScoring?: string,
    correctAnswerEachPiece?: boolean,
    limitedAnswerTime?: boolean,
    randomStart?: boolean,
    timeLimit?: number,
    ownerId?: string
}

export class SettingsModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `settings`;
    }

    public update(id: string, value: Settings): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function settingsFactory(db: IDatabase) {
    return new SettingsModel(db);
}