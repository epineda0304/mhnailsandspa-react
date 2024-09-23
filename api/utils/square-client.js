// const { ApiError, Client } = require("square");
import { Client } from "square";
import dotenv from "dotenv";

dotenv.config();

const env = process.env["ENVIRONMENT"].toLowerCase();
const accessToken = process.env["SQ_ACCESS_TOKEN"];

// Set Square credentials
const config = {
  accessToken,
  environment: env,
};

// Extract instances of Api that are used
// You can add additional APIs here if you so choose
const {
  customersApi,
  bookingsApi,
  catalogApi,
  locationsApi,
  teamApi,
  cardsApi,
} = new Client(config);

export default {
  // ApiError,
  bookingsApi,
  catalogApi,
  customersApi,
  locationsApi,
  teamApi,
  cardsApi,
};
