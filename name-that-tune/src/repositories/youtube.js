import { parse, toSeconds } from "iso8601-duration";

const getVideosWithDurations = async (gapi, videos) => {
  const videoIds = videos.map(video => video.id).join(",");
  const response = await gapi.client.youtube.videos.list({
    part: ["contentDetails,snippet"],
    id: videoIds
  });
  console.log("Response - videos", response);
  return response.result.items.map(piece => {
    const duration = toSeconds(parse(piece.contentDetails.duration));
    return {
      id: piece.id,
      title: piece.snippet.title,
      avatar: piece.snippet.thumbnails.default,
      duration: duration
    };
  });
};
const getPlaylists = async gapi => {
  const response = await gapi.client.youtube.playlists.list({
    part: ["snippet,contentDetails"],
    mine: true
  });
  console.log("Response - user playlists", response);
  return response.result.items.map(playlist => {
    return {
      id: playlist.id,
      title: playlist.snippet.title,
      avatar: playlist.snippet.thumbnails.default
    };
  });
};

const getPlaylistItems = async (gapi, playlistId, gameMode) => {
  const response = await gapi.client.youtube.playlistItems.list({
    part: ["id,status,snippet,contentDetails"],
    playlistId: playlistId
  });
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
  return items;
};

export { getPlaylists, getPlaylistItems };
