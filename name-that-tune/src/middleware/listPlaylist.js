/* eslint-disable @typescript-eslint/no-var-requires */
// ("use strict");

const { google } = require("googleapis");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");

const youtube = google.youtube("v3");

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
    scopes: ["https://www.googleapis.com/auth/youtube"]
  });
  google.options({ auth });

  // the first query will return data with an etag
  const res = await getPlaylistData(null);
  const etag = res.data.etag;
  console.log(`etag: ${etag}`);

  // the second query will (likely) return no data, and an HTTP 304
  // since the If-None-Match header was set with a matching eTag
  const res2 = await getPlaylistData(etag);
  console.log(res2.status);
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;

// export default function({ accessToken, apiKey, store }) {
//   const BASE_URL = "https://youtube.googleapis.com/youtube/v3/playlists";
//   const params = {
//     part: "snippet",
//     maxResults: 25,
//     mine: true,
//     key: apiKey
//   };
//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       Accept: "application/json"
//     }
//   };
//   return axios
//     .get(BASE_URL, params, config)
//     .then(response => {
//       console.log(response);
//       // store.commit('add', response.data.results)
//     })
//     .catch(err => {
//       console.error(err);
//     });
// }
