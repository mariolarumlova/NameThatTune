import databaseFactory from "@/dataProvider/classes/Database";
import playlistFactory from "@/dataProvider/dto/Playlist";
import musicalPieceFactory from "@/dataProvider/dto/MusicalPiece";
import piecePartFactory from "@/dataProvider/dto/PiecePart";
import { v4 as generateGuid } from "uuid";

const database = databaseFactory();
const musicalPiecesTable = musicalPieceFactory(database);
const piecePartsTable = piecePartFactory(database);
const playlistsTable = playlistFactory(database);

const generateCustomPlaylist = (userGuid, youtubePlaylistDetails) => {
  const guid = generateGuid();
  const now = Date.now();
  return {
    id: guid,
    title: youtubePlaylistDetails.customTitle || youtubePlaylistDetails.title,
    avatar: youtubePlaylistDetails.avatar,
    youtubeId: youtubePlaylistDetails.id,
    ownerId: userGuid,
    createdAtTimestamp: now,
    lastModifiedAtTimestamp: now
  };
};

const addPlaylistToDatabase = async (userGuid, youtubePlaylistDetails) => {
  const customPlaylist = generateCustomPlaylist(
    userGuid,
    youtubePlaylistDetails
  );
  const result = await playlistsTable.update(customPlaylist.id, customPlaylist);
  return result.isSuccessful ? customPlaylist : null;
};

const addPlaylistItemsToDatabase = async (playlistId, youtubeItems) => {
  const now = Date.now();

  let musicalPiecesToInsert = [];
  let piecePartsToInsert = [];

  youtubeItems.forEach(ytItem => {
    const musicalPieceGuid = generateGuid();
    const musicalPiece = {
      id: musicalPieceGuid,
      title: ytItem.title,
      avatar: ytItem.avatar,
      multipart: false,
      playlistId: playlistId,
      includedInTournament: true,
      createdAtTimestamp: now,
      lastModifiedAtTimestamp: now
    };
    musicalPiecesToInsert = [...musicalPiecesToInsert, musicalPiece];
    const piecePartGuid = generateGuid();
    const piecePart = {
      id: piecePartGuid,
      index: 1,
      avatar: ytItem.avatar,
      musicalPieceId: musicalPieceGuid,
      youtubeId: ytItem.id,
      startTimeSec: 0,
      endTimeSec: ytItem.duration,
      createdAtTimestamp: now,
      lastModifiedAtTimestamp: now
    };
    piecePartsToInsert = [
      ...piecePartsToInsert,
      piecePartsTable.update(piecePartGuid, piecePart)
    ];
  });

  const musicalPiecesResults = await Promise.all(
    musicalPiecesToInsert.map(piece =>
      musicalPiecesTable.update(piece.id, piece)
    )
  );
  const piecePartsResults = await Promise.all(piecePartsToInsert);
  return musicalPiecesResults.every(result => result.isSuccessful) &&
    piecePartsResults.every(result => result.isSuccessful)
    ? musicalPiecesToInsert
    : null;
};

const getCustomPieces = async playlistId => {
  const result = await musicalPiecesTable.query([
    { key: "playlistId", value: playlistId }
  ]);
  return result && result.isSuccessful ? result.data : [];
};

const getPieceParts = async musicalPieceId => {
  const result = await piecePartsTable.query([
    { key: "musicalPieceId", value: musicalPieceId }
  ]);
  return result && result.isSuccessful ? result.data : [];
};

const updatePieceParts = async pieceWithParts => {
  const now = Date.now();
  const oldPieceParts = await getPieceParts(pieceWithParts.id);
  const newPiecePartsIds = pieceWithParts.parts.map(part => part.id);
  const deletedPartsIds = oldPieceParts.reduce((acc, part) => {
    return !newPiecePartsIds.includes(part.id) ? [...acc, part.id] : acc;
  }, []);
  await Promise.all(
    deletedPartsIds.map(partId => piecePartsTable.delete(partId))
  );
  const piecePartPromises = pieceWithParts.parts.reduce((acc, part) => {
    const partToUpdate = {
      id: part.id,
      title: part.title || null,
      musicalPieceId: part.musicalPieceId,
      youtubeId: part.youtubeId,
      startTimeSec: part.startTimeSec,
      endTimeSec: part.endTimeSec,
      index: part.index
    };
    if (!partToUpdate.id) {
      partToUpdate.id = generateGuid();
    }
    partToUpdate.musicalPieceId = pieceWithParts.id;
    partToUpdate.lastModifiedAtTimestamp = now;
    return [...acc, piecePartsTable.update(partToUpdate.id, partToUpdate)];
  }, []);
  const piecePartsResults = await Promise.all(piecePartPromises);
  return piecePartsResults.every(result => result.isSuccessful) ? true : false;
};

const updateMusicalPiece = async pieceWithParts => {
  const now = Date.now();
  const musicalPieceToUpdate = {
    includedInTournament: pieceWithParts.includedInTournament,
    lastModifiedAtTimestamp: now,
    multipart: pieceWithParts.multipart,
    title: pieceWithParts.title,
    notes: pieceWithParts.notes ? pieceWithParts.notes : null
  };
  const musicalPieceResult = await musicalPiecesTable.update(
    pieceWithParts.id,
    musicalPieceToUpdate
  );

  const piecePartsUpdated = await updatePieceParts(pieceWithParts);

  return musicalPieceResult.isSuccessful && piecePartsUpdated ? true : false;
};

const isMusicalPieceValid = pieceWithParts => {
  const hasParts = pieceWithParts.parts && pieceWithParts.parts.length;
  return hasParts;
};

const deletePieceParts = async pieceId => {
  const pieceParts = await piecePartsTable.query([
    { key: "musicalPieceId", value: pieceId }
  ]);
  const piecePartsIds = pieceParts.data.map(el => el.id);
  return Promise.all(
    piecePartsIds.map(async partId => {
      return await piecePartsTable.delete(partId);
    })
  );
};

const deletePiece = async pieceId => {
  const pieceDeletionResult = await musicalPiecesTable.delete(pieceId);
  const piecePartsDeletionResults = await deletePieceParts(pieceId);
  return (
    pieceDeletionResult.isSuccessful &&
    piecePartsDeletionResults.every(el => el.isSuccessful)
  );
};

const deletePlaylist = async playlistId => {
  const playlistDeleted = await playlistsTable.delete(playlistId);
  const result = await musicalPiecesTable.query([
    { key: "playlistId", value: playlistId }
  ]);
  const musicalPiecesIds = result.data.map(el => el.id);
  const piecesDeletionResults = await Promise.all(
    musicalPiecesIds.map(pieceId => deletePiece(pieceId))
  );
  return (
    playlistDeleted.isSuccessful &&
    piecesDeletionResults.every(el => el === true)
  );
};

const parseDuration = durationSec => {
  const minutes = (+durationSec - (+durationSec % 60)) / 60;
  const seconds = +durationSec % 60;
  return {
    minutes: minutes,
    seconds: seconds,
    display: minutes + ":" + ("0" + seconds).slice(-2)
  };
};

const minutesToSeconds = (minutes, seconds) => {
  return +minutes * 60 + +seconds;
};

export {
  addPlaylistToDatabase,
  addPlaylistItemsToDatabase,
  getCustomPieces,
  updateMusicalPiece,
  isMusicalPieceValid,
  deletePlaylist,
  deletePiece,
  parseDuration,
  minutesToSeconds
};
