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
  const deleteResults = await Promise.all(
    deletedPartsIds.map(partId => piecePartsTable.delete(partId))
  );
  const piecePartPromises = pieceWithParts.parts.reduce((acc, part) => {
    if (!part.id) {
      part.id = generateGuid();
    }
    part.musicalPieceId = pieceWithParts.id;
    part.lastModifiedAtTimestamp = now;
    return [...acc, piecePartsTable.update(part.id, part)];
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
    notes: pieceWithParts.notes
  };
  const musicalPieceResult = await musicalPiecesTable.update(
    pieceWithParts.id,
    musicalPieceToUpdate
  );

  const piecePartsUpdated = await updatePieceParts(pieceWithParts);

  return musicalPieceResult.isSuccessful && piecePartsUpdated ? true : false;
};

export {
  addPlaylistToDatabase,
  addPlaylistItemsToDatabase,
  getCustomPieces,
  updateMusicalPiece
};
