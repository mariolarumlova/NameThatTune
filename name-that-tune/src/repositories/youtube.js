import { parse, toSeconds } from "iso8601-duration";

const getVideosWithDurations = async (gapi, videos) => {
  const videoIds = videos.map(video => video.id).join(",");
  const response = await gapi.client.youtube.videos.list({
    part: ["contentDetails,snippet"],
    id: videoIds,
    maxResults: 50
  });
  return response.result.items.map(piece => {
    const duration = toSeconds(parse(piece.contentDetails.duration));
    return {
      id: piece.id,
      title: piece.snippet.title,
      avatar: piece.snippet.thumbnails.default.url,
      duration: duration
    };
  });
};
const getPlaylists = async gapi => {
  const response = await gapi.client.youtube.playlists.list({
    part: ["snippet,contentDetails"],
    mine: true,
    maxResults: 50
  });
  return response.result.items.map(playlist => {
    return {
      id: playlist.id,
      title: playlist.snippet.title,
      avatar: playlist.snippet.thumbnails.default.url
    };
  });
};

const getPlaylistItems = async (gapi, playlistId) => {
  const response = await gapi.client.youtube.playlistItems.list({
    part: ["id,status,snippet,contentDetails"],
    playlistId: playlistId,
    maxResults: 50
  });
  const items = response.result.items.map(piece => {
    return {
      id: piece.contentDetails.videoId,
      title: piece.snippet.title,
      avatar: piece.snippet.thumbnails.default
    };
  });
  return getVideosWithDurations(gapi, items);
};

export { getPlaylists, getPlaylistItems };
