import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface PieceToPlaylist extends IContent {
    playlistId: string,
    musicalPieceId: string
}

export class PieceToPlaylistModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `piecesToPlaylists`;
    }

    public update(id: string, value: PieceToPlaylist): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function pieceToPlaylistFactory(db: IDatabase) {
    return new PieceToPlaylistModel(db);
}