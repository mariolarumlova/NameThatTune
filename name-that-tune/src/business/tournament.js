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

const getPiecesWithParts = playlistId => {
  return [];
};

export { shuffle, getPiecesWithParts };
