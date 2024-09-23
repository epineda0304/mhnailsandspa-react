import squareClient from "./utils/square-client.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

let __dirname = path.dirname(fileURLToPath(import.meta.url));

__dirname = path.join(__dirname, "..", "client");
dotenv.config();

const app = express();

// Check that all required .env variables exist
if (!process.env["ENVIRONMENT"]) {
  console.error('.env file missing required field "ENVIRONMENT".');
  process.exit(1);
} else if (!process.env["SQ_ACCESS_TOKEN"]) {
  console.error('.env file missing required field "SQ_ACCESS_TOKEN".');
  process.exit(1);
} else if (!process.env["SQ_LOCATION_ID"]) {
  console.error('.env file missing required field "SQ_LOCATION_ID".');
  process.exit(1);
}

squareClient.locationsApi
  .retrieveLocation(process.env["SQ_LOCATION_ID"])
  .then(function (response) {
    app.locals.location = response.result.location;
  })
  .catch(function (error) {
    if (error.statusCode === 401) {
      console.error(
        "Configuration has failed. Please verify `.env` file is correct."
      );
    }
    process.exit(1);
  });

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", routes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/serviceMenu/:type", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/location", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
