import databaseFactory from "@/dataProvider/classes/Database";
import musicalPieceFactory from "@/dataProvider/dto/MusicalPiece";
import piecePartFactory from "@/dataProvider/dto/PiecePart";
import { v4 as generateGuid } from "uuid";

const database = databaseFactory();
const musicalPiecesTable = musicalPieceFactory(database);
const piecePartsTable = piecePartFactory(database);

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

export { shuffle, getPiecesWithParts };
