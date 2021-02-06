import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface Answer extends IContent {
    correctPiece: string,
    givenPiece: string,
    tournamentId: string,
}

export class AnswerModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `answers`;
    }

    public update(id: string, value: Answer): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function answerFactory(db: IDatabase) {
    return new AnswerModel(db);
}