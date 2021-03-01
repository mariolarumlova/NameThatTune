import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface Mark extends IContent {
    name: string,
    recordingId: string,
    startTimeSec: number,
    endTimeSec: number,
}

export class MarkModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `marks`;
    }

    public update(id: string, value: Mark): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function markFactory(db: IDatabase) {
    return new MarkModel(db);
}