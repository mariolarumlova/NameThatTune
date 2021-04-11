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
const getPiecesWithParts = async (playlistId, includedInTournament) => {
  const result = await musicalPiecesTable.query([
    { key: "playlistId", value: playlistId },
    { key: "includedInTournament", value: includedInTournament }
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
  if (selectedPart && selected.multipart) {
    name += " - " + (selectedPart.title || selectedPart.index);
  }
  return name;
};

const getCorrectPieceName = currentPiece => {
  let name = currentPiece.title;
  if (currentPiece.currentPart && currentPiece.multipart) {
    name +=
      " - " +
      (currentPiece.currentPart.title || currentPiece.currentPart.index);
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
  userBadPartScoring
) => {
  const now = Date.now();
  const givenPiece = getGivenPieceName(selected, selectedPart);
  const correctPiece = getCorrectPieceName(currentPiece);
  const badPartScoring = +userBadPartScoring || 0.5;
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

const getHumanReadableResult = answer => {
  const { correctPiece, givenPiece, score } = answer;
  switch (score) {
    case 1:
      return `Correct answer!`;
    case 0.5:
      return `Incorrect part! It's ${correctPiece}, not ${givenPiece}`;
    case 0:
      return `Incorrect piece! It's ${correctPiece}, not ${givenPiece}`;
    default:
      return `An error occured`;
  }
};

const defaultSettings = {
  badPartScoring: 0.5,
  correctAnswerEachPiece: true,
  limitedAnswerTime: true,
  randomStart: true,
  timeLimit: 10
};

export {
  getPiecesWithParts,
  addTournamentToDatabase,
  updateTournament,
  addAnswerToDatabase,
  getHumanReadableResult,
  defaultSettings
};
