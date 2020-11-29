import * as express from "express";
import * as path from "path";
import * as history from "connect-history-api-fallback";

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname + "/dist"));

app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
app.use(staticFileMiddleware);

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/dist/index.html"));
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log("App now running on port", port);
});
