// You need to connect your app to MongoDB before you can initialize
// the application default state data into MongoDB.
// connectDB() connects the app to MongoDB.

import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/myorganizer`;

let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.log("Got DB,", db);
  return db;
}

// connectDB();
