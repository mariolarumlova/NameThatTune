interface Tournament {
    id: string,
    playlistId: string,
    userId: string,
    correctAnswersAmount: number,
    totalAnswersAmount: number,
    createdAtTimestamp: number,
    lastModifiedAtTimestamp: number
}