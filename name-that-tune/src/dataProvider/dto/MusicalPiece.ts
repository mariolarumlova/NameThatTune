import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface MusicalPiece extends IContent {
    title: string,
    composerId: string,
    multipart: boolean
}

export class MusicalPieceModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `musicalPieces`;
    }

    public update(id: string, value: MusicalPiece): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function musicalPieceFactory(db: IDatabase) {
    return new MusicalPieceModel(db);
}