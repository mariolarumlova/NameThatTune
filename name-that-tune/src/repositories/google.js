/* eslint-disable no-async-promise-executor */
const authenticate = (gapi, scopes) => {
  return new Promise(async (resolve, reject) => {
    gapi.load("client:auth2", function() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      gapi.auth2.init({ client_id: process.env.VUE_APP_CLIENT_ID });

      gapi.auth2
        .getAuthInstance()
        .signIn({
          scopes: scopes
        })
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
const loadClient = (gapi, apiName, apiVersion) => {
  return new Promise(async (resolve, reject) => {
    gapi.client.setApiKey(process.env.VUE_APP_YOUTUBE_API_KEY);
    await gapi.client
      .load(
        `https://www.googleapis.com/discovery/v1/apis/${apiName}/${apiVersion}/rest`
      )
      .then(
        function() {
          console.log("GAPI client loaded for API");
          resolve();
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
          reject(err);
        }
      );
  });
};

export { authenticate, loadClient };
