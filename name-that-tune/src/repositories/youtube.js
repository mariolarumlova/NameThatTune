import { parse, toSeconds } from "iso8601-duration";
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
          // if (this.gameMode === "tournament") {
          //   items = await this.getVideosWithDurations(items);
          // }
          resolve(items);
        },
        function(err) {
          console.error("Execute error", err);
          resolve([]);
        }
      );
  });
};

const getPlaylistItems = (gapi, playlistId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    gapi.client.youtube.playlistItems
      .list({
        part: ["id,status,snippet,contentDetails"],
        playlistId: playlistId
      })
      .then(
        function(response) {
          console.log("Response - playlist items", response);
          const items = response.result.items.map(piece => {
            return {
              id: piece.contentDetails.videoId,
              title: piece.snippet.title,
              avatar: piece.snippet.thumbnails.default
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
const getVideosWithDurations = (gapi, videos) => {
  const videoIds = videos.map(video => video.id).join(",");
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    gapi.client.youtube.playlistItems
      .list({
        part: ["contentDetails,snippet"],
        id: videoIds
      })
      .then(
        function(response) {
          console.log("Response - videos", response);
          const items = response.result.items.map(piece => {
            return {
              id: piece.id,
              title: piece.snippet.title,
              avatar: piece.snippet.thumbnails.default,
              duration: piece.contentDetails.duration
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

export { getPlaylists, getPlaylistItems, getVideosWithDurations };
