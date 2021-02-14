import { v4 as generateGuid } from "uuid";
const getPlaylistDbObject = (userGuid, youtubePlaylistDetails) => {
  const guid = generateGuid();
  const now = Date.now();
  return {
    id: guid,
    title: youtubePlaylistDetails.customTitle || youtubePlaylistDetails.title,
    avatar: youtubePlaylistDetails.avatar.url,
    youtubeId: youtubePlaylistDetails.id,
    ownerId: userGuid,
    createdAtTimestamp: now,
    lastModifiedAtTimestamp: now
  };
};

export { getPlaylistDbObject };
