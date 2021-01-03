interface PiecePart {
    id: string,
    title: string,
    musicalPieceId: string,
    youtubeId: string,
    startTimeSec: number,
    endTimeSec: number,
    // instruments: Enumerator[],
    // metrum: Enumerator[],
    // key: Enumerator,
    notes: string,
    // image: string //url
    createdAtTimestamp: number,
    lastModifiedAtTimestamp: number
}
