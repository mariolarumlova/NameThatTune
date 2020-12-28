import { parse, toSeconds } from "iso8601-duration";

const getVideosWithDurations = (gapi, videos) => {
  const videoIds = videos.map(video => video.id).join(",");
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    gapi.client.youtube.videos
      .list({
        part: ["contentDetails,snippet"],
        id: videoIds
      })
      .then(
        function(response) {
          console.log("Response - videos", response);
          const items = response.result.items.map(piece => {
            const duration = toSeconds(parse(piece.contentDetails.duration));
            return {
              id: piece.id,
              title: piece.snippet.title,
              avatar: piece.snippet.thumbnails.default,
              duration: duration
            };
          });
          resolve(items);
        },
        function(err) {
          console.error("Execute error", err);
          resolve([]);
        }
      );
  });
};
const getPlaylists = gapi => {
  return new Promise((resolve, reject) => {
    gapi.client.youtube.playlists
      .list({
        part: ["snippet,contentDetails"],
        mine: true
      })
      .then(
        function(response) {
          console.log("Response - user playlists", response);
          const items = response.result.items.map(playlist => {
            return {
              id: playlist.id,
              title: playlist.snippet.title,
              avatar: playlist.snippet.thumbnails.default
            };
          });
          resolve(items);
        },
        function(err) {
          console.error("Execute error", err);
          resolve([]);
        }
      );
  });
};

const getPlaylistItems = (gapi, playlistId, gameMode) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    gapi.client.youtube.playlistItems
      .list({
        part: ["id,status,snippet,contentDetails"],
        playlistId: playlistId
      })
      .then(
        async function(response) {
          console.log("Response - playlist items", response);
          let items = response.result.items.map(piece => {
            return {
              id: piece.contentDetails.videoId,
              title: piece.snippet.title,
              avatar: piece.snippet.thumbnails.default
            };
          });
          if (gameMode === "tournament") {
            items = await getVideosWithDurations(gapi, items);
          }
          resolve(items);
        },
        function(err) {
          console.error("Execute error", err);
          resolve([]);
        }
      );
  });
};

export { getPlaylists, getPlaylistItems };
