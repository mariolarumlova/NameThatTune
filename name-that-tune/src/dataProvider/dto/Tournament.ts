import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { Model } from '../classes/Model';
import { DBResult } from '../interfaces/DBResult';

interface Tournament extends IContent {
    playlistId: string,
    youtubeId: string,
    userId: string,
    correctAnswersAmount: number,
    totalAnswersAmount: number,
    complete: boolean,
    customPlaylist: boolean
}

export class TournamentModel extends Model {
    constructor(db: IDatabase) {
        super(db);
        this.table = `tournaments`;
    }

    public update(id: string, value: Tournament): Promise<DBResult> {
        return this.db.update(id, value, this.table);
    }
}

export default function tournamentFactory(db: IDatabase) {
    return new TournamentModel(db);
}