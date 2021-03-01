import databaseFactory from "@/dataProvider/classes/Database";
import musicalPieceFactory from "@/dataProvider/dto/MusicalPiece";
import piecePartFactory from "@/dataProvider/dto/PiecePart";
import tournamentFactory from "@/dataProvider/dto/Tournament";
import answerFactory from "@/dataProvider/dto/Answer";
import { v4 as generateGuid } from "uuid";

const database = databaseFactory();
const musicalPiecesTable = musicalPieceFactory(database);
const piecePartsTable = piecePartFactory(database);
const tournamentsTable = tournamentFactory(database);
const answersTable = answerFactory(database);

const shuffle = inputArray => {
  const array = JSON.parse(JSON.stringify(inputArray));
  let m = array.length;
  let t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

const getPiecesWithParts = async playlistId => {
  const result = await musicalPiecesTable.query([
    { key: "playlistId", value: playlistId }
  ]);
  const resultWithParts = await Promise.all(
    result.data.map(async piece => {
      const piecePartsResponse = await piecePartsTable.query([
        { key: "musicalPieceId", value: piece.id }
      ]);
      piece.parts = piecePartsResponse.data;
      return piece;
    })
  );
  return resultWithParts;
};

const addTournamentToDatabase = async (userGuid, playlist) => {
  const guid = generateGuid();
  const now = Date.now();
  const tournament = {
    id: guid,
    userId: userGuid,
    youtubeId: playlist.youtubeId || playlist.id,
    complete: false,
    correctAnswersAmount: 0,
    totalAnswersAmount: 0,
    customPlaylist: playlist.customPlaylist,
    createdAtTimestamp: now,
    lastModifiedAtTimestamp: now
  };
  const result = await tournamentsTable.update(guid, tournament);
  return result.isSuccessful ? tournament : null;
};

const updateTournament = async tournament => {
  const now = Date.now();
  const result = await tournamentsTable.update(tournament.id, {
    complete: tournament.complete,
    correctAnswersAmount: tournament.correctAnswersAmount,
    totalAnswersAmount: tournament.totalAnswersAmount,
    lastModifiedAtTimestamp: now
  });
  return result.isSuccessful ? tournament : null;
};

const getGivenPieceName = (selected, selectedPart) => {
  let name = selected.title;
  if (selectedPart && (selectedPart.title || selectedPart.index)) {
    name += " - " + (selectedPart.title || selectedPart.index);
  }
  return name;
};

const getCorrectPieceName = currentPiece => {
  let name = currentPiece.title;
  if (
    currentPiece.currentPart &&
    (currentPiece.currentPart.title || currentPiece.currentPart.index)
  ) {
    name +=
      " - " + (currentPiece.currentPart.title || currentPiece.currentPart.index);
  }
  return name;
};

const calculateScore = (
  currentPiece,
  selected,
  selectedPart,
  badPartScoring
) => {
  let score = 0;
  if (currentPiece.multipart && currentPiece.currentPart && selectedPart) {
    if (currentPiece.currentPart.id === selectedPart.id) {
      score = 1;
    } else {
      score = currentPiece.id === selected.id ? badPartScoring : 0;
    }
  } else {
    score = currentPiece.id === selected.id ? 1 : 0;
  }
  return score;
};

const addAnswerToDatabase = async (
  tournamentId,
  currentPiece,
  selected,
  selectedPart,
  badPartScoring
) => {
  const now = Date.now();
  const givenPiece = getGivenPieceName(selected, selectedPart);
  const correctPiece = getCorrectPieceName(currentPiece);
  const score = calculateScore(
    currentPiece,
    selected,
    selectedPart,
    badPartScoring
  );
  const guid = generateGuid();
  const answer = {
    id: guid,
    tournamentId: tournamentId,
    givenPiece: givenPiece,
    correctPiece: correctPiece,
    score: score,
    createdAtTimestamp: now,
    lastModifiedAtTimestamp: now
  };
  const result = await answersTable.update(guid, answer);
  return result.isSuccessful ? answer : null;
};

export {
  shuffle,
  getPiecesWithParts,
  addTournamentToDatabase,
  updateTournament,
  addAnswerToDatabase
};
