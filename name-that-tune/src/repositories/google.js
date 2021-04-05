/* eslint-disable no-async-promise-executor */
const authenticate = (gapi, scope, clientName) => {
  return new Promise(async (resolve, reject) => {
    gapi.load("client:auth2", function() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      gapi.client.init({
        apiKey: process.env.VUE_APP_YOUTUBE_API_KEY,
        discoveryDocs: [
          `https://www.googleapis.com/discovery/v1/apis/${clientName}/rest`
        ],
        clientId: process.env.VUE_APP_CLIENT_ID,
        scope: scope
      });

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(data => {
          console.log("Sign-in successful");
          resolve(data);
        })
        .catch(err => {
          console.error("Error signing in", err);
          reject(err);
        });
    });
  });
};

export { authenticate };
