/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
// ("use strict");
const axios = require("axios");

const { google } = require("googleapis");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");

const people = google.people("v1");
const youtube = google.youtube("v3");

const getBasicUserInfo = async accessToken => {
  const BASE_URL = "https://www.googleapis.com/plus/v1/people/me";
  const params = {
    alt: "json"
    // "access_token": accessToken
  };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json"
    }
  };
  return await axios.get(BASE_URL, params, config);
};

async function getPlaylistData(etag) {
  // Create custom HTTP headers for the request to enable use of eTags
  const headers = {};
  if (etag) {
    headers["If-None-Match"] = etag;
  }
  const res = await youtube.playlists.list({
    part: "id,snippet",
    maxResults: 25,
    mine: true,
    headers: headers
  });
  console.log("Status code: " + res.status);
  console.log(res.data);
  return res;
}

// a very simple example of getting data from a playlist
async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/youtube",
      "profile"
    ]
  });
  google.options({ auth });
  console.log("AUTH");
  console.log(auth);
  const userInfo = await people.people.get({
    resourceName: "people/me",
    personFields: "names,photos"
  });
  console.log("USER INFO");
  //const userInfo = await getBasicUserInfo(auth.credentials.access_token);
  const displayName = userInfo.data.names[0].displayName;
  const profilePicture = userInfo.data.photos[0].url;
  console.log(`${displayName}\n${profilePicture}`);

  // the first query will return data with an etag
  const res = await getPlaylistData(null);
  const etag = res.data.etag;
  console.log(`etag: ${etag}`);

  // the second query will (likely) return no data, and an HTTP 304
  // since the If-None-Match header was set with a matching eTag
  const res2 = await getPlaylistData(etag);
  console.log(res2.status);
}

async function test() {
  const oauth2Client = new google.auth.OAuth2(
    "633325488746-sn9qq8n380lf97b2cnpe42vh6jb4emn2.apps.googleusercontent.com",
    "m_yN9Duk04QEcbbjCsYxES1W",
    "http://localhost:3000/oauth2callback"
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/youtube",
    "profile"
  ];
  const url = oauth2Client.generateAuthUrl({
    // access_type: "offline",
    scope: scopes
  });
  console.log(url);
  const code = "4%2F0AY0e-g6tIEQNUj1XhcK0sgjbGoNnsnIMDw3gKEJfNlyMA6Ew8GQN3sK0zh1He0KYcsvvfQ&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube#";
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
}


if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
