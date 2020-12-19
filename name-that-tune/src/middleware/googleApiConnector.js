/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");

async function getUserInfo(googleApisObj) {
  const people = googleApisObj.people("v1");
  const userData = (
    await people.people.get({
      resourceName: "people/me",
      personFields: "names,photos"
    })
  ).data;
  const nameVariations = userData.names[0];
  return {
    displayName: nameVariations.displayName,
    familyName: nameVariations.familyName,
    givenName: nameVariations.givenName,
    profilePictureUrl: userData.photos[0].url
  };
}

async function getPlaylistData(googleApisObj, etag) {
  const youtube = googleApisObj.youtube("v3");
  const headers = {};
  if (etag) {
    headers["If-None-Match"] = etag;
  }
  return await youtube.playlists.list({
    part: "id,snippet",
    maxResults: 25,
    mine: true,
    headers: headers
  });
}

async function getGoogleAuthObject() {
  const { google } = require("googleapis");
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: ["https://www.googleapis.com/auth/youtube", "profile"]
  });
  google.options({ auth });
  return google;
}

async function runSample() {
  const googleAuth = await getGoogleAuthObject();
  const userInfo = await getUserInfo(googleAuth);
  console.log(userInfo);
  const res = await getPlaylistData(googleAuth, null);
  console.log("Youtube GET Playlist: Status code: " + res.status);
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = { getGoogleAuthObject };
