import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface PiecePart extends IContent {
    title: string,
    avatar: string,
    musicalPieceId: string,
    youtubeId: string,
    startTimeSec: number,
    endTimeSec: number,
    // instruments: Enumerator[],
    // metrum: Enumerator[],
    // key: Enumerator,
    // image: string //url
}

export class PiecePartModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `pieceParts`;
    }

    public update(id: string, value: PiecePart): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function piecePartFactory(db: IDatabase) {
    return new PiecePartModel(db);
}