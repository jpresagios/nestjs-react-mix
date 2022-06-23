import * as dotenv from 'dotenv';

dotenv.config({});

export default {
  API_PORT: process.env.API_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};
