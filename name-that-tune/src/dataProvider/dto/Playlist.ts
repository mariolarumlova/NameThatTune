import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface Playlist extends IContent {
    title: string,
    youtubeId: string,
    ownerId: string
}

export class PlaylistModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `playlists`;
    }

    public update(id: string, value: Playlist): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function playlistFactory(db: IDatabase) {
    return new PlaylistModel(db);
}