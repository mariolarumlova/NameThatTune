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
      index: 0,
      avatar: ytItem.avatar,
      musicalPieceId: musicalPieceGuid,
      youtubeId: ytItem.id,
      startTimeSec: 0,
      endTimeSec: ytItem.duration
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
  console.log(musicalPiecesResults);
  console.log(piecePartsResults);
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

export { addPlaylistToDatabase, addPlaylistItemsToDatabase, getCustomPieces };
