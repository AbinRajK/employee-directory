// backend/database/connection.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri || typeof uri !== 'string') {
  throw new Error('❌ MONGO_URI is not defined or invalid in .env');
}

let client;

export const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
  }
  return client.db(); // Returns default database from URI
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
  }
};
