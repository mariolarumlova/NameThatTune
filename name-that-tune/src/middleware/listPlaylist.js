import axios from "axios";

export default function({ accessToken, apiKey, store }) {
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3/playlists";
  const params = {
    part: "snippet",
    maxResults: 25,
    mine: true,
    key: apiKey
  };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json"
    }
  };
  return axios
    .get(BASE_URL, params, config)
    .then(response => {
      console.log(response);
      // store.commit('add', response.data.results)
    })
    .catch(err => {
      console.error(err);
    });
}
